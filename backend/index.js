const express = require('express');
const cors = require('cors');
const app = express();
<<<<<<< HEAD
const notesRoute = require('./routes/notes'); // adjust if in a different path
const helloRoute = require('./routes/hello');
app.use('/api', helloRoute);

app.use(cors());
app.use(express.json());

// Use the route
app.use('/api', notesRoute); // <---- VERY IMPORTANT

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
=======
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
>>>>>>> 83e9891cc1f022f08376198d245e4e32886f22d6
});
