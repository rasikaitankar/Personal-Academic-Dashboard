const db = require('../db/connect');

const testEmail = 'test@example.com';
const testPassword = '123456'; // Use bcrypt in real projects

db.run(
  'INSERT OR IGNORE INTO users (email, password) VALUES (?, ?)',
  [testEmail, testPassword],
  function (err) {
    if (err) return console.error('Insert error:', err);
    console.log('Test user inserted.');
    db.close();
  }
);
