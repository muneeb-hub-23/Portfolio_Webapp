const express = require('express');
const router = express.Router();
const db = require('../database/db');
const authMiddleware = require('../middleware/auth');

// Get EmailJS config (public - needed for frontend)
router.get('/config', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT service_id, template_id, public_key FROM emailjs_config ORDER BY id DESC LIMIT 1');
    if (rows.length === 0) {
      return res.status(404).json({ message: 'EmailJS config not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Get EmailJS config error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get full EmailJS config including target email (protected)
router.get('/config/admin', authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM emailjs_config ORDER BY id DESC LIMIT 1');
    if (rows.length === 0) {
      return res.status(404).json({ message: 'EmailJS config not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Get EmailJS config error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update EmailJS config (protected)
router.put('/config', authMiddleware, async (req, res) => {
  try {
    const { service_id, template_id, public_key, target_email } = req.body;

    if (!service_id || !template_id || !public_key || !target_email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if config exists
    const [existing] = await db.query('SELECT * FROM emailjs_config ORDER BY id DESC LIMIT 1');

    if (existing.length === 0) {
      // Create new config
      const query = 'INSERT INTO emailjs_config (service_id, template_id, public_key, target_email) VALUES (?, ?, ?, ?)';
      await db.query(query, [service_id, template_id, public_key, target_email]);
    } else {
      // Update existing config
      const query = 'UPDATE emailjs_config SET service_id = ?, template_id = ?, public_key = ?, target_email = ? WHERE id = ?';
      await db.query(query, [service_id, template_id, public_key, target_email, existing[0].id]);
    }

    // Get updated config
    const [updated] = await db.query('SELECT * FROM emailjs_config ORDER BY id DESC LIMIT 1');
    res.json(updated[0]);
  } catch (error) {
    console.error('Update EmailJS config error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
