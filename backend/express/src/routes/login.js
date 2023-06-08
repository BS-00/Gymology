const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const users = await queryDb(`SELECT * FROM Users WHERE email = '${email}' AND password = SHA2(SHA2('${password+email}', 512), 512)`);
  if(users === null ||
     users === undefined) {
    throw new RangeError("Error gettimg users from database");
  }

  if (users.length === 1) {
    const { uid, email } = users[0];
    res.status(200).json({ message: 'Login successful', uid, email });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
