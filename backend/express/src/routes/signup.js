const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;
const hashPass = require('../utils/password.js').hashPass;

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const userCount = (await queryDb(`SELECT COUNT(*) AS userCount FROM Users WHERE email = '${email}';`))[0].userCount;

  if(userCount === null ||
     userCount === undefined) {
    throw new RangeError("Error getting user count from database");
  }

  if (userCount > 0) {
    res.status(409).send('Email already exists');
    return;
  }

  await queryDb(`INSERT INTO Users (email, password) VALUES ('${email}', '${await hashPass(password)}');`); 
  res.sendStatus(201);
});

module.exports = router;
