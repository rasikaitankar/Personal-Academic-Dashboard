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
});
