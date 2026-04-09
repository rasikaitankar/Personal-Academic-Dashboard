const express = require('express');
const router = express.Router();

router.get('/about', (req, res) => {
  res.json({ message: "This is your personal academic dashboard powered by React and Node.js." });
});

module.exports = router;
