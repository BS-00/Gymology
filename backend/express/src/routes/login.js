const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM Users WHERE email = '${email}' AND password = '${password}'`;

  queryDb(query, (rows) => {
    if (rows.length === 0) {
      res.status(401).json({ message: 'Invalid credentials' });
      console.log('Invalid credentials');
    } else {
      console.log('Login successful');
      res.status(200).json({ message: 'Login successful' });
    }
  });
});

module.exports = router;
