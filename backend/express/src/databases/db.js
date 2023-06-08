require('dotenv').config({path: '../../.env'});
const mysql = require('mysql');
const assert = require('assert');

let db_conn = null;

function initDb() {
	if(db_conn) {
		console.warn("Database already initialized");
		return null;
	}
	
	db_conn = mysql.createConnection({
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASS,
		database: process.env.MYSQL_DB_NAME
	});

	db_conn.connect(err => {
		if (err) {
			console.warn("Failed to create a connection to " +
						process.env.MYSQL_DB_NAME +
						"\nExited with error: ");
			throw err;
		}
		console.log("Connected to " +
					process.env.MYSQL_DB_NAME + " on port " +
					process.env.MYSQL_PORT);
	});
	return db_conn;
}

async function queryDb(query) {
	if(db_conn == null) {
		console.warn("Tried to query database without first initializing");
		return null;
	}

	try {
		return await new Promise((resolve, reject) => db_conn.query(query, (err, res) => {
			if(err) reject(err);
			else resolve(res);
		}));
  	} 
	catch (err) {
    	console.warn("Error querying database: ", err);
  	}
}

function closeDb() {
	if(db_conn == null) {
		console.warn("Tried to close nonexistent database connection");
		return false;
	}
	db_conn.end();
	console.log("Connection to " + process.env.MYSQL_DB_NAME + " closed");
	return true;
}


module.exports = {
	initDb,
	queryDb,
	closeDb
};
