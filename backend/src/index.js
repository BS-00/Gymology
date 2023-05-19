const express = require('express');
const app = express();
const PORT = 3001;

app.listen(PORT, (error) => {
    if (error) {
      console.log("Backend error: " + error);
      return;
    }
    console.log("ExpressJS server running on port " + PORT);
});
