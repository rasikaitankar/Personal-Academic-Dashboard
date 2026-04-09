const express = require('express');
const router = express.Router();
const db = require('../db');

// Get user info
router.get('/hello', (req, res) => {
  db.get(`SELECT name FROM users WHERE email = ?`, ['test@example.com'], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'User not found' });
    res.json({ message: `Welcome back, ${row.name}!`, name: row.name });
  });
});

// Get all notes
router.get('/about', (req, res) => {
  db.all(`SELECT * FROM usernotes`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ notes: rows });
  });
});

// Add note
router.post('/notes', (req, res) => {
  const { name, note } = req.body;
  if (!name || !note) return res.status(400).json({ error: 'Missing name or note' });

  db.run(`INSERT INTO usernotes (name, note) VALUES (?, ?)`, [name, note], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: this.lastID });
  });
});

module.exports = router;
