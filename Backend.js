const express = require("express")
const app = express()
app.listen(3000)

const mysql = require("mysql")

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

app.get('/', (req, res) => {
    res.send("test");
})

app.post('data', (req, res) => {
    res.send("post send");
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
})