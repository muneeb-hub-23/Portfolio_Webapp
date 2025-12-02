const express = require('express');
const router = express.Router();
const db = require('../database/db');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for skill icon uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/skills';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /png|jpg|jpeg|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only PNG, JPG, JPEG, and SVG files are allowed!'));
  }
});

// Get all skills (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM skills ORDER BY display_order ASC, id ASC');
    res.json(rows);
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single skill (public)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM skills WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Get skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create skill (protected)
router.post('/', authMiddleware, upload.single('icon'), async (req, res) => {
  try {
    const { name, description, display_order } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Skill name is required' });
    }

    let iconPath = null;
    if (req.file) {
      iconPath = `/uploads/skills/${req.file.filename}`;
    }

    const query = 'INSERT INTO skills (name, icon, description, display_order) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(query, [name, iconPath, description, display_order || 0]);

    const [newSkill] = await db.query('SELECT * FROM skills WHERE id = ?', [result.insertId]);
    res.status(201).json(newSkill[0]);
  } catch (error) {
    console.error('Create skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update skill (protected)
router.put('/:id', authMiddleware, upload.single('icon'), async (req, res) => {
  try {
    const { name, description, display_order } = req.body;

    // Get existing skill to check for old icon
    const [existing] = await db.query('SELECT * FROM skills WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    let iconPath = existing[0].icon;
    
    // If new icon uploaded, delete old one and use new
    if (req.file) {
      // Delete old icon file if exists
      if (existing[0].icon) {
        const oldPath = path.join(__dirname, '..', existing[0].icon);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      iconPath = `/uploads/skills/${req.file.filename}`;
    }

    const query = 'UPDATE skills SET name = ?, icon = ?, description = ?, display_order = ? WHERE id = ?';
    await db.query(query, [name, iconPath, description, display_order || 0, req.params.id]);

    const [updated] = await db.query('SELECT * FROM skills WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (error) {
    console.error('Update skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete skill (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // Get skill to find icon file
    const [skill] = await db.query('SELECT * FROM skills WHERE id = ?', [req.params.id]);
    if (skill.length === 0) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    // Delete icon file if exists
    if (skill[0].icon) {
      const iconPath = path.join(__dirname, '..', skill[0].icon);
      if (fs.existsSync(iconPath)) {
        fs.unlinkSync(iconPath);
      }
    }

    // Delete from database
    const [result] = await db.query('DELETE FROM skills WHERE id = ?', [req.params.id]);
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
