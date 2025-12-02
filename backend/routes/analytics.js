const express = require('express');
const router = express.Router();
const db = require('../database/db');
const authMiddleware = require('../middleware/auth');

// Track page view (public)
router.post('/track', async (req, res) => {
  try {
    const { page_path, referrer, session_id } = req.body;
    const visitor_ip = req.ip || req.connection.remoteAddress;
    const user_agent = req.headers['user-agent'];

    // Simple device detection
    const device_type = /mobile/i.test(user_agent) ? 'Mobile' : 
                       /tablet/i.test(user_agent) ? 'Tablet' : 'Desktop';
    
    // Simple browser detection
    let browser = 'Other';
    if (user_agent.includes('Chrome')) browser = 'Chrome';
    else if (user_agent.includes('Firefox')) browser = 'Firefox';
    else if (user_agent.includes('Safari')) browser = 'Safari';
    else if (user_agent.includes('Edge')) browser = 'Edge';

    // Insert page view
    await db.query(
      `INSERT INTO page_views (page_path, visitor_ip, user_agent, referrer, device_type, browser) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [page_path, visitor_ip, user_agent, referrer, device_type, browser]
    );

    // Update or create popular pages
    await db.query(
      `INSERT INTO popular_pages (page_path, view_count, unique_visitors) 
       VALUES (?, 1, 1) 
       ON DUPLICATE KEY UPDATE view_count = view_count + 1`,
      [page_path]
    );

    // Update session
    if (session_id) {
      await db.query(
        `INSERT INTO visitor_sessions (session_id, visitor_ip, pages_viewed) 
         VALUES (?, ?, 1) 
         ON DUPLICATE KEY UPDATE pages_viewed = pages_viewed + 1, last_activity = NOW()`,
        [session_id, visitor_ip]
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Track page view error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get dashboard analytics (protected)
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    // Total page views
    const [totalViews] = await db.query('SELECT COUNT(*) as count FROM page_views');
    
    // Unique visitors (by IP)
    const [uniqueVisitors] = await db.query(
      'SELECT COUNT(DISTINCT visitor_ip) as count FROM page_views'
    );

    // Today's stats
    const [todayViews] = await db.query(
      `SELECT COUNT(*) as count FROM page_views 
       WHERE DATE(visited_at) = CURDATE()`
    );

    const [todayVisitors] = await db.query(
      `SELECT COUNT(DISTINCT visitor_ip) as count FROM page_views 
       WHERE DATE(visited_at) = CURDATE()`
    );

    // Active sessions (last 30 minutes)
    const [activeSessions] = await db.query(
      `SELECT COUNT(*) as count FROM visitor_sessions 
       WHERE last_activity >= DATE_SUB(NOW(), INTERVAL 30 MINUTE)`
    );

    res.json({
      totalViews: totalViews[0].count,
      uniqueVisitors: uniqueVisitors[0].count,
      todayViews: todayViews[0].count,
      todayVisitors: todayVisitors[0].count,
      activeSessions: activeSessions[0].count
    });
  } catch (error) {
    console.error('Get dashboard analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get views over time (protected)
router.get('/views-timeline', authMiddleware, async (req, res) => {
  try {
    const { days = 7 } = req.query;
    
    const [results] = await db.query(
      `SELECT 
        DATE(visited_at) as date,
        COUNT(*) as views,
        COUNT(DISTINCT visitor_ip) as visitors
       FROM page_views 
       WHERE visited_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
       GROUP BY DATE(visited_at)
       ORDER BY date ASC`,
      [parseInt(days)]
    );

    res.json(results);
  } catch (error) {
    console.error('Get views timeline error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get popular pages (protected)
router.get('/popular-pages', authMiddleware, async (req, res) => {
  try {
    const [results] = await db.query(
      `SELECT page_path, view_count, unique_visitors, last_viewed 
       FROM popular_pages 
       ORDER BY view_count DESC 
       LIMIT 10`
    );

    res.json(results);
  } catch (error) {
    console.error('Get popular pages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get device statistics (protected)
router.get('/devices', authMiddleware, async (req, res) => {
  try {
    const [results] = await db.query(
      `SELECT device_type, COUNT(*) as count 
       FROM page_views 
       WHERE visited_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
       GROUP BY device_type`
    );

    res.json(results);
  } catch (error) {
    console.error('Get device stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get browser statistics (protected)
router.get('/browsers', authMiddleware, async (req, res) => {
  try {
    const [results] = await db.query(
      `SELECT browser, COUNT(*) as count 
       FROM page_views 
       WHERE visited_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
       GROUP BY browser 
       ORDER BY count DESC`
    );

    res.json(results);
  } catch (error) {
    console.error('Get browser stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get hourly activity (protected)
router.get('/hourly-activity', authMiddleware, async (req, res) => {
  try {
    const [results] = await db.query(
      `SELECT 
        HOUR(visited_at) as hour,
        COUNT(*) as views
       FROM page_views 
       WHERE visited_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
       GROUP BY HOUR(visited_at)
       ORDER BY hour ASC`
    );

    res.json(results);
  } catch (error) {
    console.error('Get hourly activity error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
