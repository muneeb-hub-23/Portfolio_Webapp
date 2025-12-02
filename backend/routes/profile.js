const express = require('express');
const router = express.Router();
const db = require('../database/db');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/profile';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Get profile (public)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM profile ORDER BY id DESC LIMIT 1');
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update profile (protected)
router.put('/', authMiddleware, upload.single('picture'), async (req, res) => {
  try {
    const { name, description } = req.body;
    let pictureUrl = null;

    if (req.file) {
      pictureUrl = `/uploads/profile/${req.file.filename}`;
    }

    // Check if profile exists
    const [existing] = await db.query('SELECT * FROM profile ORDER BY id DESC LIMIT 1');

    if (existing.length === 0) {
      // Create new profile
      const query = 'INSERT INTO profile (name, description, picture) VALUES (?, ?, ?)';
      await db.query(query, [name, description, pictureUrl]);
    } else {
      // Update existing profile
      let query = 'UPDATE profile SET name = ?, description = ?';
      const params = [name, description];

      if (pictureUrl) {
        query += ', picture = ?';
        params.push(pictureUrl);
      }

      query += ' WHERE id = ?';
      params.push(existing[0].id);

      await db.query(query, params);
    }

    // Get updated profile
    const [updated] = await db.query('SELECT * FROM profile ORDER BY id DESC LIMIT 1');
    res.json(updated[0]);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
