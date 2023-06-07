require('dotenv').config({path: '../.env'});
//Initialize MySQL Database
require('./databases/db').initDb();


const express = require('express');
const app = express();

//Add cors headers (to prevent Access-Control-Allow-Origin header error)
const cors = require('cors');
app.use(cors({
	origin: ['http://localhost:3000']
}));

//Add body parser so post requests can be read
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use(require('./routes/create-workout'));
app.use(require('./routes/presets'));

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

