const express = require('express');
const router = express.Router();
const db = require('../db/connect'); // Adjust path if your db.js is in a different folder

router.get('/hello', (req, res) => {
  // We'll fetch the first user as a test (adjust later for actual logged-in user)
  const query = `SELECT name FROM users LIMIT 1`;

  db.get(query, [], (err, row) => {
    if (err) {
      console.error('❌ Error fetching user:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (row) {
      res.json({ message: `Welcome back, ${row.name}!` });
    } else {
      res.status(404).json({ error: 'No user found' });
    }
  });
});

module.exports = router;
