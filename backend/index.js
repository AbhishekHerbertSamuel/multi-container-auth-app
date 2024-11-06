const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'database',
  user: 'user',
  password: 'user_password',
  database: 'auth_db'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
  
  // Create users table if not exists
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `;
  db.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log('Users table is ready.');
  });
});

// Sign up route
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).send('Username already exists.');
      }
      return res.status(500).send('Error registering user.');
    }
    res.send('User registered successfully!');
  });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, result) => {
    if (err) return res.status(500).send('Database error.');
    if (result.length === 0) return res.status(400).send('No such user found.');

    const user = result[0];
    if (user.password === password) {
      res.send('Successfully logged in!');
    } else {
      res.status(400).send('Invalid password.');
    }
  });
});

app.listen(5000, () => {
  console.log('Backend running on port 5000');
});
