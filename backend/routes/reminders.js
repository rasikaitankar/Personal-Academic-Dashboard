const express = require('express');
const router = express.Router();
const db = require('../db');
const nodemailer = require('nodemailer');

// POST /api/reminders
router.post('/reminders', (req, res) => {
  const { title, datetime, email } = req.body;

  db.run(
    `INSERT INTO reminders (title, datetime, email) VALUES (?, ?, ?)`,
    [title, datetime, email],
    function (err) {
      if (err) return res.status(500).json({ success: false });

      const delay = new Date(datetime).getTime() - Date.now();

      if (delay > 0) {
        setTimeout(() => {
          sendEmail(email, title, datetime);
        }, delay);
      }

      res.json({ success: true });
    }
  );
});

function sendEmail(to, title, datetime) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your@gmail.com',
      pass: 'your-app-password',
    },
  });

  const mailOptions = {
    from: 'your@gmail.com',
    to,
    subject: '⏰ Reminder Alert!',
    text: `Don't forget: "${title}" scheduled at ${datetime}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error('Email error:', error);
    else console.log('✅ Email sent:', info.response);
  });
}

module.exports = router;
