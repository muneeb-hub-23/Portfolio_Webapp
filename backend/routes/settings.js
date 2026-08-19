const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../database/db');
const jwtConfig = require('../config/jwtConfig');
const authMiddleware = require('../middleware/auth');

// Get social links (public)
router.get('/social-links', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM social_links ORDER BY id DESC LIMIT 1');
    if (rows.length === 0) {
      return res.json({
        whatsapp: '',
        linkedin: '',
        youtube: '',
        facebook: ''
      });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Get social links error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update social links (protected)
router.put('/social-links', authMiddleware, async (req, res) => {
  try {
    const { whatsapp, linkedin, youtube, facebook } = req.body;

    // Check if social links exist
    const [existing] = await db.query('SELECT * FROM social_links ORDER BY id DESC LIMIT 1');

    if (existing.length === 0) {
      // Create new social links
      await db.query(
        'INSERT INTO social_links (whatsapp, linkedin, youtube, facebook) VALUES (?, ?, ?, ?)',
        [whatsapp || '', linkedin || '', youtube || '', facebook || '']
      );
    } else {
      // Update existing social links
      await db.query(
        'UPDATE social_links SET whatsapp = ?, linkedin = ?, youtube = ?, facebook = ? WHERE id = ?',
        [whatsapp || '', linkedin || '', youtube || '', facebook || '', existing[0].id]
      );
    }

    // Get updated social links
    const [updated] = await db.query('SELECT * FROM social_links ORDER BY id DESC LIMIT 1');
    res.json(updated[0]);
  } catch (error) {
    console.error('Update social links error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Change username (protected)
router.post('/change-username', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newUsername } = req.body;

    if (!currentPassword || !newUsername) {
      return res.status(400).json({ message: 'Please provide current password and new username' });
    }

    // Get current admin
    const [rows] = await db.query('SELECT * FROM admin WHERE id = ?', [req.admin.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const admin = rows[0];

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Check if new username already exists
    const [existingUser] = await db.query('SELECT * FROM admin WHERE username = ? AND id != ?', [newUsername, req.admin.id]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Update username
    await db.query('UPDATE admin SET username = ? WHERE id = ?', [newUsername, req.admin.id]);

    // Generate new token with updated username
    const token = jwt.sign(
      { id: admin.id, username: newUsername },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    res.json({ 
      message: 'Username updated successfully',
      token,
      admin: {
        id: admin.id,
        username: newUsername
      }
    });
  } catch (error) {
    console.error('Change username error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Change password (protected)
router.post('/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Please provide current and new password' });
    }

    // Get current admin
    const [rows] = await db.query('SELECT * FROM admin WHERE id = ?', [req.admin.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const admin = rows[0];

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await db.query('UPDATE admin SET password = ? WHERE id = ?', [hashedPassword, req.admin.id]);

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current admin info (protected)
router.get('/admin-info', authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, username, created_at FROM admin WHERE id = ?', [req.admin.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Get admin info error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
