const express = require('express');
const db = require('../database/db');
const auth = require('../middleware/auth');
const router = express.Router();
const reserved = new Set(['admin', 'api', 'assets', 'uploads', 'health']);

function normalizePath(value) {
  if (typeof value !== 'string') return null;
  const path = '/' + value.trim().toLowerCase().replace(/^\/+|\/+$/g, '');
  if (path.length > 255 || !/^\/[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/.test(path)) return null;
  return reserved.has(path.split('/')[1]) ? null : path;
}

function validate(req, res, next) {
  const { title, path, content } = req.body || {};
  const normalized = normalizePath(path);
  if (typeof title !== 'string' || !title.trim() || title.trim().length > 255) {
    return res.status(400).json({ message: 'Page title is required (maximum 255 characters).' });
  }
  if (!normalized) return res.status(400).json({ message: 'Use a path such as /about or /services/design (letters, numbers and hyphens). Home, admin, api, assets, uploads and health paths are reserved.' });
  if (typeof content !== 'string' || !content.trim() || Buffer.byteLength(content, 'utf8') > 1024 * 1024) {
    return res.status(400).json({ message: 'HTML content is required and must be 1 MB or smaller.' });
  }
  req.page = { title: title.trim(), path: normalized, content };
  next();
}

function failure(res, error) {
  if (error.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'A page already uses this link.' });
  console.error('Custom pages error:', error);
  return res.status(500).json({ message: 'Unable to process custom pages.' });
}

router.get('/public', async (req, res) => {
  const path = normalizePath(req.query.path);
  if (!path) return res.status(404).json({ message: 'Page not found.' });
  try {
    const [rows] = await db.query('SELECT title, path, content FROM custom_pages WHERE path = ?', [path]);
    if (!rows.length) return res.status(404).json({ message: 'Page not found.' });
    res.json(rows[0]);
  } catch (error) { failure(res, error); }
});

router.use(auth);
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, title, path, updated_at FROM custom_pages ORDER BY updated_at DESC, id DESC');
    res.json(rows);
  } catch (error) { failure(res, error); }
});
router.param('id', (req, res, next, id) => {
  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) return res.status(400).json({ message: 'Invalid page ID.' });
  next();
});
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM custom_pages WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Page not found.' });
    res.json(rows[0]);
  } catch (error) { failure(res, error); }
});
router.post('/', validate, async (req, res) => {
  try {
    const { title, path, content } = req.page;
    const [result] = await db.query('INSERT INTO custom_pages (title, path, content) VALUES (?, ?, ?)', [title, path, content]);
    res.status(201).json({ id: result.insertId, ...req.page });
  } catch (error) { failure(res, error); }
});
router.put('/:id', validate, async (req, res) => {
  try {
    const { title, path, content } = req.page;
    const [result] = await db.query('UPDATE custom_pages SET title = ?, path = ?, content = ? WHERE id = ?', [title, path, content, req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Page not found.' });
    res.json({ id: Number(req.params.id), ...req.page });
  } catch (error) { failure(res, error); }
});
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM custom_pages WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Page not found.' });
    res.json({ message: 'Page deleted.' });
  } catch (error) { failure(res, error); }
});
module.exports = router;
