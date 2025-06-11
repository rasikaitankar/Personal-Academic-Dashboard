const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: "About page from backend." });
});

module.exports = router;
