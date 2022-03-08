const express = require("express")
const bodyParser = require("body-parser");

const port = 3000;
const app = express()

// Initiate body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());


/* const mysql = require("mysql")

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
}); */

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

// Brugt til at test API key ved requests
app.get("/checkAuth", checkAuth, (req, res) => {
	
	res.json({message: "Hello world!"});

})

// Test af post
app.post('/postTest', (req, res) => {

	console.log( new Date().toLocaleTimeString(), "-", "Modtaget post:", req.body, req.ip);

	res.json({message: "Post successful!"});

})

// Start app
app.listen(port, () => console.log(`App listening on port: ${port}`));