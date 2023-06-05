require('dotenv').config({path: '../.env'});
//Initialize MySQL Database
require('./databases/db').initDb();

const express = require('express');
const app = express();

//Routes
app.use(require('./routes/create-workout'));


//Express Server
app.listen(process.env.EXPRESS_PORT, (err) => {
    if (err) {
		console.log("Failed to start express server on port " +
					process.env.EXPRESS_PORT +
					"\nExited with error: ");
		throw err;
    }
    console.log("Express server listening on port " +
			    process.env.EXPRESS_PORT);
});

