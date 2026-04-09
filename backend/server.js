const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Mount the route
const helloRoute = require('./routes/hello'); // path to hello.js
app.use('/api', helloRoute); // Mounts /hello at /api/hello

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
