const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/user'); // handles /api/login
const reminderRoutes = require('./routes/reminderRoutes'); // handles /api/reminders

app.use('/api', userRoutes);
app.use('/api/reminders', reminderRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
