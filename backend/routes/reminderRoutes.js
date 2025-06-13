const express = require('express');
const router = express.Router();
const { createReminder, getReminders } = require('../controllers/reminderController');

router.post('/', createReminder);  // POST /api/reminders
router.get('/', getReminders);     // GET /api/reminders

module.exports = router;
