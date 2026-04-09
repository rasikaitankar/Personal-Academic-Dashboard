<<<<<<< HEAD
app.post('/api/login', (req, res) => {
  console.log("Login API called with:", req.body);

=======
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT name FROM users WHERE email = ? AND password = ?`, [email, password], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false });
    }

    if (row) {
      res.json({ success: true, name: row.name });
    } else {
      res.json({ success: false });
    }
  });
>>>>>>> 83e9891cc1f022f08376198d245e4e32886f22d6
});
