const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const helloRoute = require('./routes/hello');
const notesRoute = require('./routes/notes');
const userRoutes = require('./routes/user'); // LOGIN route

// Use routes
app.use('/api', helloRoute);
app.use('/api', notesRoute);
app.use('/api', userRoutes); // ✅ THIS FIXES LOGIN

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});