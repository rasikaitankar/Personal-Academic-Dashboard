const express = require('express');
const cors = require('cors');
const app = express();

// DB (fix path if needed)
const db = require('./db');

app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/user');
const notesRoute = require('./routes/notes');
const helloRoute = require('./routes/hello');

app.use('/api', userRoutes);
app.use('/api', notesRoute);
app.use('/api', helloRoute);

// ✅ THIS MUST EXIST
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});