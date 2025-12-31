const express = require('express');
const cors = require('cors');
const app = express();
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
});
