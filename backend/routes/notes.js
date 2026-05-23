const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/notes - Create a new note
router.post('/notes', (req, res) => {
  const { name, note } = req.body;

  if (!note) {
    return res.status(400).json({ error: 'Note content is required' });
  }

  db.run(`INSERT INTO notes (name, note) VALUES (?, ?)`, [name || 'Anonymous', note], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to save note' });
    }
    res.json({ success: true, message: 'Note created successfully', id: this.lastID });
  });
});

// GET /api/notes - Retrieve all notes
router.get('/notes', (req, res) => {
  db.all(`SELECT id, name, note, datetime FROM notes ORDER BY datetime DESC`, (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to retrieve notes' });
    }
    res.json({ success: true, notes: rows || [] });
  });
});

// GET /api/notes/:id - Retrieve a specific note by ID
router.get('/notes/:id', (req, res) => {
  const { id } = req.params;

  db.get(`SELECT id, name, note, datetime FROM notes WHERE id = ?`, [id], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to retrieve note' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ success: true, note: row });
  });
});

// PUT /api/notes/:id - Update/Edit a note
router.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  const { name, note } = req.body;

  if (!note) {
    return res.status(400).json({ error: 'Note content is required' });
  }

  db.run(`UPDATE notes SET name = ?, note = ? WHERE id = ?`, [name || 'Anonymous', note, id], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to update note' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ success: true, message: 'Note updated successfully' });
  });
});

// DELETE /api/notes/:id - Delete a note
router.delete('/notes/:id', (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM notes WHERE id = ?`, [id], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to delete note' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ success: true, message: 'Note deleted successfully' });
  });
});

module.exports = router;
