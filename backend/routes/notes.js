const express = require('express');
const router = express.Router();
const db = require('../db/connect'); // Adjust path based on your project

router.get('/notes', (req, res) => {
  db.all(`SELECT * FROM usernotes`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch notes' });
    }
    res.json({ notes: rows });
  });
});

router.post('/notes', (req, res) => {
  const { name, notes } = req.body;

  if (!name || !notes) {
    return res.status(400).json({ error: 'Name and notes are required' });
  }

  db.run(`INSERT INTO usernotes (name, notes) VALUES (?, ?)`, [name, notes], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to save note' });
    }
    res.json({ message: 'Note saved successfully', id: this.lastID });
  });
});

module.exports = router;
