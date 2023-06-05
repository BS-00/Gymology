require('dotenv').config({path: '../../.env'});

const express = require('express');
const app = express();
const PORT = process.env.EXPRESS_PORT;

app.listen(PORT, (error) => {
    if (error) {
      console.log("Backend error: " + error);
      return;
    }
    console.log("ExpressJS server listening on port " + PORT);
});
