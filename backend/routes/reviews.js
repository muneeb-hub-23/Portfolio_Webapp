const express = require('express');
const router = express.Router();
const db = require('../database/db');
const authMiddleware = require('../middleware/auth');

// Get all reviews for a project (public - only approved)
router.get('/project/:projectId', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM reviews WHERE project_id = ? AND is_approved = TRUE ORDER BY created_at DESC',
      [req.params.projectId]
    );
    res.json(rows);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all reviews (admin - including unapproved)
router.get('/admin/all', authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT r.*, p.name as project_name 
       FROM reviews r 
       LEFT JOIN projects p ON r.project_id = p.id 
       ORDER BY r.created_at DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error('Get all reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create review (public - visitors can post)
router.post('/', async (req, res) => {
  try {
    const { project_id, reviewer_name, reviewer_email, rating, comment } = req.body;

    if (!project_id || !reviewer_name || !rating || !comment) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const query = `
      INSERT INTO reviews (project_id, reviewer_name, reviewer_email, rating, comment, is_approved) 
      VALUES (?, ?, ?, ?, ?, FALSE)
    `;
    const [result] = await db.query(query, [project_id, reviewer_name, reviewer_email, rating, comment]);

    res.status(201).json({ 
      message: 'Review submitted successfully. It will be visible after approval.',
      id: result.insertId 
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update review (protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { reviewer_name, reviewer_email, rating, comment, is_approved } = req.body;

    const query = `
      UPDATE reviews 
      SET reviewer_name = ?, reviewer_email = ?, rating = ?, comment = ?, is_approved = ? 
      WHERE id = ?
    `;
    await db.query(query, [reviewer_name, reviewer_email, rating, comment, is_approved, req.params.id]);

    const [updated] = await db.query('SELECT * FROM reviews WHERE id = ?', [req.params.id]);
    if (updated.length === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(updated[0]);
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve/reject review (protected)
router.patch('/:id/approve', authMiddleware, async (req, res) => {
  try {
    const { is_approved } = req.body;

    await db.query('UPDATE reviews SET is_approved = ? WHERE id = ?', [is_approved, req.params.id]);

    const [updated] = await db.query('SELECT * FROM reviews WHERE id = ?', [req.params.id]);
    if (updated.length === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json(updated[0]);
  } catch (error) {
    console.error('Approve review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete review (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM reviews WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
