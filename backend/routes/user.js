const express = require('express');
const router = express.Router();
const db = require('../db');

// 👉 Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT name FROM users WHERE email = ? AND password = ?`,
    [email, password],
    (err, row) => {
      if (err) return res.status(500).json({ success: false, error: err.message });
      if (row) return res.json({ success: true, name: row.name });
      res.json({ success: false });
    });
});

// 👉 Hello route – fetch logged in user (mocked)
router.get('/hello', (req, res) => {
  db.get(`SELECT name FROM users WHERE email = ?`, ['test@example.com'], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'User not found' });
    res.json({ name: row.name });
  });
});

// 👉 Get all notes
router.get('/about', (req, res) => {
  db.all(`SELECT id, name, note FROM notes`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ notes: rows });
  });
});

// 👉 Get notes list
router.get('/notes', (req, res) => {
  db.all(`SELECT id, name, note FROM notes`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ notes: rows });
  });
});

// 👉 Add new note
router.post('/notes', (req, res) => {
  const { name, note } = req.body;
  if (!name || !note) return res.status(400).json({ success: false, error: 'Missing name or note' });

  db.run(`INSERT INTO notes (name, note) VALUES (?, ?)`, [name, note], function (err) {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, id: this.lastID });
  });
});

// 👉 Update note
router.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  const { note } = req.body;

  if (!note) return res.status(400).json({ success: false, error: 'Note content is required' });

  db.run(`UPDATE notes SET note = ? WHERE id = ?`, [note, id], function (err) {
    if (err) return res.status(500).json({ success: false, error: err.message });
    if (this.changes === 0) return res.status(404).json({ success: false, error: 'Note not found' });
    res.json({ success: true });
  });
});

// 👉 Delete note
router.delete('/notes/:id', (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM notes WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ success: false, error: err.message });
    if (this.changes === 0) return res.status(404).json({ success: false, error: 'Note not found' });
    res.json({ success: true });
  });
});

module.exports = router;
