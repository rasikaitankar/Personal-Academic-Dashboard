<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
=======
// routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // adjust path to your db file

// POST /api/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT name FROM users WHERE email = ? AND password = ?`;
  db.get(query, [email, password], (err, row) => {
    if (err) {
      console.error('❌ DB error:', err);
      return res.status(500).json({ success: false });
    }

    if (row) {
      // ✅ User found
      res.json({ success: true, name: row.name });
    } else {
      // ❌ No user found
      res.json({ success: false });
    }
  });
});
>>>>>>> 83e9891cc1f022f08376198d245e4e32886f22d6

module.exports = router;
