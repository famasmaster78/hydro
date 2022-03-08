const express = require("express")
const bodyParser = require("body-parser");

const port = 3000;
const app = express()

// Initiate body parser
app.use(bodyParser.urlencoded({ extended: true }))

/* const mysql = require("mysql")

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
}); */

app.get('/', (req, res) => {
    res.send("Velkommen til hydroponics API! - Lavet af: Jesper, Alexander & Jonas");
})

app.post('/postTest', (req, res) => {

	console.log("Modtaget post:", req.body);

	res.send("Post successful!");

})

app.listen(port, () => console.log(`App listening on port: ${port}`));