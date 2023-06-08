const { hash } = require('bcrypt');
const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;
const cmpPass = require('../utils/password.js').cmpPass;

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const users = await queryDb(`SELECT * FROM Users WHERE email = '${email}';`);

  if(users === null ||
     users === undefined) {
    throw new RangeError("Error gettimg users from database");
  }

  if (users.length === 1 && await cmpPass(password, users[0].password)) {
    const { uid, email } = users[0];
    res.status(200).json({ message: 'Login successful', uid, email });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
