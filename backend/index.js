const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Import routers
const helloRouter = require('./router/hello');
const aboutRouter = require('./router/about');

app.use(cors());
app.use(express.json());

// Use routers
app.use('/api/hello', helloRouter);
app.use('/api/about', aboutRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
