const express = require('express');
const router = express.Router();
const queryDb = require('../databases/db.js').queryDb;

router.post('/signup', (req, res) => {
  const { email, password } = req.body;
  const query = `INSERT INTO Users (email, password) VALUES ('${email}', SHA2(SHA2('${password+email}', 512), 512))`;

  queryDb(query, (rows) => {
    console.log('User inserted successfully');
    res.sendStatus(200);
  });
});

module.exports = router;
