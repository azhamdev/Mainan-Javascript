const express = require("express");
const mysql = require("mysql");
const BodyParser = require("body-parser");

const app = express();

// untuk menerima input pake body parser
app.use(BodyParser.urlencoded({ extended: true }))

// setup ejs
app.set("view engine", "ejs")
// untuk ngasih tau file html ada di folder views
// viewsnya ada di folder views
app.set("views", "views")

// konfigurasi awal / inisialisasi
const db = mysql.createConnection({
    host: "localhost",
    database: 'school',
    user: 'root',
    password: ''
})

// untuk koneksikan
db.connect((err) => {
    if (err) throw err
    console.log("database connected...");

    // untuk get data 
    app.get("/", (req, res) => {
        const sql = "SELECT * FROM user"
        db.query(sql, (err, result) => {
            const users = JSON.parse(JSON.stringify(result));
            console.log("hasil database -> ", users);
            // res.send(users)
            res.render("index", { users: users, title: "DAFTAR MURID" })
        })
    })

    // untuk insert data 
    app.post("/tambah", (req, res) => {
        const insertSql = `INSERT INTO user (nama, kelas) VALUES ("${req.body.nama}", "${req.body.kelas}");`
        db.query(insertSql, (err, result) => {
            if (err) throw err
            res.redirect("/");
        })
    })

})

app.listen(8000, () => {
    console.log("Server Readyy ...");
})