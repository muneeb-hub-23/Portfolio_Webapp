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
    const dir = 'uploads/projects';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
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

// Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const [projects] = await db.query('SELECT * FROM projects ORDER BY display_order ASC, id DESC');
    
    // Get images and skills for each project
    for (let project of projects) {
      const [images] = await db.query(
        'SELECT * FROM project_images WHERE project_id = ? ORDER BY display_order ASC',
        [project.id]
      );
      project.images = images;

      const [skills] = await db.query(
        `SELECT s.* FROM skills s 
         INNER JOIN project_skills ps ON s.id = ps.skill_id 
         WHERE ps.project_id = ?`,
        [project.id]
      );
      project.skills = skills;

      // Get one approved review
      const [reviews] = await db.query(
        'SELECT * FROM reviews WHERE project_id = ? AND is_approved = TRUE ORDER BY created_at DESC LIMIT 1',
        [project.id]
      );
      project.featured_review = reviews[0] || null;
    }

    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single project (public)
router.get('/:id', async (req, res) => {
  try {
    const [projects] = await db.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (projects.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const project = projects[0];

    // Get images
    const [images] = await db.query(
      'SELECT * FROM project_images WHERE project_id = ? ORDER BY display_order ASC',
      [project.id]
    );
    project.images = images;

    // Get skills
    const [skills] = await db.query(
      `SELECT s.* FROM skills s 
       INNER JOIN project_skills ps ON s.id = ps.skill_id 
       WHERE ps.project_id = ?`,
      [project.id]
    );
    project.skills = skills;

    // Get all approved reviews
    const [reviews] = await db.query(
      'SELECT * FROM reviews WHERE project_id = ? AND is_approved = TRUE ORDER BY created_at DESC',
      [project.id]
    );
    project.reviews = reviews;

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create project (protected)
router.post('/', authMiddleware, upload.array('images', 20), async (req, res) => {
  try {
    const { name, description, video_link, display_order, skill_ids } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    // Insert project
    const query = 'INSERT INTO projects (name, description, video_link, display_order) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(query, [name, description, video_link, display_order || 0]);
    const projectId = result.insertId;

    // Insert images
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const imageUrl = `/uploads/projects/${req.files[i].filename}`;
        await db.query(
          'INSERT INTO project_images (project_id, image_url, display_order) VALUES (?, ?, ?)',
          [projectId, imageUrl, i]
        );
      }
    }

    // Insert project skills
    if (skill_ids) {
      const skillArray = Array.isArray(skill_ids) ? skill_ids : JSON.parse(skill_ids);
      for (let skillId of skillArray) {
        await db.query(
          'INSERT INTO project_skills (project_id, skill_id) VALUES (?, ?)',
          [projectId, skillId]
        );
      }
    }

    // Get created project with all data
    const [newProject] = await db.query('SELECT * FROM projects WHERE id = ?', [projectId]);
    const [images] = await db.query('SELECT * FROM project_images WHERE project_id = ?', [projectId]);
    const [skills] = await db.query(
      `SELECT s.* FROM skills s 
       INNER JOIN project_skills ps ON s.id = ps.skill_id 
       WHERE ps.project_id = ?`,
      [projectId]
    );

    newProject[0].images = images;
    newProject[0].skills = skills;

    res.status(201).json(newProject[0]);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update project (protected)
router.put('/:id', authMiddleware, upload.array('images', 20), async (req, res) => {
  try {
    const { name, description, video_link, display_order, skill_ids, existing_images } = req.body;

    // Update project
    const query = 'UPDATE projects SET name = ?, description = ?, video_link = ?, display_order = ? WHERE id = ?';
    await db.query(query, [name, description, video_link, display_order || 0, req.params.id]);

    // Handle images
    if (existing_images) {
      // Delete images not in existing_images list
      const existingImageArray = Array.isArray(existing_images) ? existing_images : JSON.parse(existing_images);
      if (existingImageArray.length > 0) {
        await db.query(
          'DELETE FROM project_images WHERE project_id = ? AND id NOT IN (?)',
          [req.params.id, existingImageArray]
        );
      } else {
        await db.query('DELETE FROM project_images WHERE project_id = ?', [req.params.id]);
      }
    }

    // Add new images
    if (req.files && req.files.length > 0) {
      const [existingCount] = await db.query(
        'SELECT COUNT(*) as count FROM project_images WHERE project_id = ?',
        [req.params.id]
      );
      let startOrder = existingCount[0].count;

      for (let i = 0; i < req.files.length; i++) {
        const imageUrl = `/uploads/projects/${req.files[i].filename}`;
        await db.query(
          'INSERT INTO project_images (project_id, image_url, display_order) VALUES (?, ?, ?)',
          [req.params.id, imageUrl, startOrder + i]
        );
      }
    }

    // Update project skills
    await db.query('DELETE FROM project_skills WHERE project_id = ?', [req.params.id]);
    if (skill_ids) {
      const skillArray = Array.isArray(skill_ids) ? skill_ids : JSON.parse(skill_ids);
      for (let skillId of skillArray) {
        await db.query(
          'INSERT INTO project_skills (project_id, skill_id) VALUES (?, ?)',
          [req.params.id, skillId]
        );
      }
    }

    // Get updated project with all data
    const [updated] = await db.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    const [images] = await db.query('SELECT * FROM project_images WHERE project_id = ?', [req.params.id]);
    const [skills] = await db.query(
      `SELECT s.* FROM skills s 
       INNER JOIN project_skills ps ON s.id = ps.skill_id 
       WHERE ps.project_id = ?`,
      [req.params.id]
    );

    updated[0].images = images;
    updated[0].skills = skills;

    res.json(updated[0]);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete project (protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
