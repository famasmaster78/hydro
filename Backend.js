const express = require("express")
const bodyParser = require("body-parser");

const port = 3000;
const app = express()

// Initiate body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// Promise baseret mysql
var db = require('mysql-promise')();

db.configure({
	host: "jbgaard.xyz",
    user: "hydro-user",
    password: "zW(]s6MXZ2@5.3uW",
	database: "Hydroponics-Project-2022",
	timeout: 0,
	connectTimeout: 0
});

const mysql = require("mysql")

const con = mysql.createPool({
    host: "jbgaard.xyz",
    user: "hydro-user",
    password: "zW(]s6MXZ2@5.3uW",
	database: "Hydroponics-Project-2022",
	timeout: 0,
	connectTimeout: 0
});


const ip = require("ip");

// Funktion der tjekker om request indeholder korrekt API Key
// Express middleWare
const checkAuth = (req, res, next) => {

	if (req.header("x-api-key") === "HydroProject2022") {
		
		// Continue request
		return next()
	}

	// Return fejl
	return res.status(403).json({error: "Access denied!"});

}

// Index
app.get('/', (req, res) => {
    
	res.send("Velkommen til hydroponics API! - Lavet af: Jesper, Alexander & Jonas");

})

// Test af post
app.post('/hydroData', checkAuth, (req, res) => {

	console.log( new Date().toLocaleTimeString(), "-", "Modtaget post:", req.body, req.ip);

	res.json({message: "Post successful!"});

})

// Get data som bruges af frontend til fremvisning af data
app.get("/getHydroData", checkAuth, (req, res) => {

	// Objekt der bliver sendt med response
	let echo = {
		success: false,
		data: {},
		errCode: 0,
		errText: "",
		status: []
	}

	// Først finder vi de forskellige devices, herefter finder vi alle posterne der tilhører disse devices
	db.query("SELECT DISTINCT deviceID FROM HydroData").then(results => {

		// Opret array med de forskellige devices.
		let devices = results[0].map((device) => device.deviceID);

		// Opdater echo
		echo.data.devices = devices;

		return devices;

	}).then(async devices => {

		// console.log("Devices", devices);

		echo.data.hydroData = {};

		for (device of devices) {

			await db.query("SELECT * FROM HydroData where deviceID = ?", [device]).then(results => {

				// Opdaterer echo
				echo.data.hydroData[device] = results[0];

			})

		}

	}).finally(() => {

		// Send JSON
		res.json(echo);

	})

})

// Start app
app.listen(port, () => console.log(`App listening on address: ${ip.address()}:${port}`));