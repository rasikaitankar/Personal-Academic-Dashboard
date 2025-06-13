const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error('❌ Error opening DB:', err.message);
  console.log('✅ SQLite DB connected.');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS usernotes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    note TEXT NOT NULL
  )`);

 db.run(`CREATE TABLE IF NOT EXISTS reminders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  datetime TEXT NOT NULL,
  email TEXT NOT NULL
)`);


  // Insert a default test user if not exists
  db.get(`SELECT * FROM users WHERE email = ?`, ['test@example.com'], (err, row) => {
    if (!row) {
      db.run(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        ['Test User', 'test@example.com', '123456']);
    }
  });
});

module.exports = db;
