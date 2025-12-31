const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'users.db');
console.log(`📁 Creating or opening DB at: ${dbPath}`);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) return console.error('❌ Database connection error:', err.message);
  console.log('✅ Connected to SQLite DB');
});

db.serialize(() => {
  // Drop and create 'users' table
  db.run(`DROP TABLE IF EXISTS users`);
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `, () => {
    console.log('✅ Users table is ready');

    db.run(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      ['Test User', 'test@example.com', '123456'],
      (err) => {
        if (err) console.log('❗ Insert skipped:', err.message);
        else console.log('✅ Dummy user inserted');
      }
    );
  });

  // Create 'usernotes' table
  db.run(`DROP TABLE IF EXISTS usernotes`);
  db.run(`
    CREATE TABLE usernotes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      notes TEXT NOT NULL
    )
  `, () => {
    console.log('✅ UserNotes table is ready');

    db.run(
      `INSERT INTO usernotes (name, notes) VALUES (?, ?)`,
      ['Test User', 'This is a sample note'],
      (err) => {
        if (err) console.log('❗ Note insert skipped:', err.message);
        else console.log('✅ Dummy note inserted');
      }
    );
  });
});

module.exports = db;
