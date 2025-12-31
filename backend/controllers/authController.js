const db = require('../db/connect');

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.get(
    `SELECT * FROM users WHERE email = ? AND password = ?`,
    [email, password],
    (err, row) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }

      if (!row) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.status(200).json({ message: 'Login successful', user: row });
    }
  );
};
