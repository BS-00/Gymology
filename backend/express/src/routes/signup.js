const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;

router.post('/signup', (req, res) => {
  const { email, password } = req.body;

  const checkQuery = `SELECT COUNT(*) AS count FROM Users WHERE email = '${email}'`;
  queryDb(checkQuery, (result) => {
    const count = result[0].count;

    if (count > 0) {
      res.status(409).send('Email already exists');
    } else {
      const insertQuery = `INSERT INTO Users (email, password) VALUES ('${email}', SHA2(SHA2('${password+email}', 512), 512))`;
      queryDb(insertQuery, () => {
        console.log('User inserted successfully');
        res.sendStatus(200);
      });
    }
  });
});

module.exports = router;
