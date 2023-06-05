require('dotenv').config({path: '../.env'});

const express = require('express');
const mysql = require('mysql');
const app = express();


const db_connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASS,
	database: process.env.MYSQL_DB_NAME
})

db_connection.connect(err => {
	if (err) {
		console.log("Failed to create a connection to " +
					process.env.MYSQL_DB_NAME +
				    "\nExited with error: ");
		throw err;
	}
	console.log("Connected to " +
				process.env.MYSQL_DB_NAME + " on port " +
				process.env.MYSQL_PORT);
})

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
