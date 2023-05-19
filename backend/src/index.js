require('dotenv').config()
const express = require('express');

const PORT = process.env.PORT;
const app = express();

app.listen(PORT, (error) => {
    if (error) {
      console.log("Backend error: " + error);
      return;
    }
    console.log("ExpressJS server listening on port " + PORT);
});
