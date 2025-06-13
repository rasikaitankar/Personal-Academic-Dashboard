exports.createReminder = (req, res) => {
  const { title, datetime, email } = req.body;
  console.log('Reminder received:', req.body);
  res.json({ success: true, message: 'Reminder saved!' });
};

exports.getReminders = (req, res) => {
  res.json({ reminders: [] }); // Replace with real data later
};
