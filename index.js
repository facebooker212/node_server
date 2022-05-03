const express = require("express");
const app = express();
const mysql = require("mysql")
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "PASSWORD",
  database: "jugadores"
});

app.get('/test/:field1/:field2', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const sqlInsert = `select ${req.params.field1} from ${req.params.field2}`;
  db.query(sqlInsert, (err, result) => {
    res.json(result);
  })
});

//app.post('/post/:field1/:field2', (req, res) => {
app.post('/post', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  //res.setHeader('Accept': 'application/json');
  //const sqlInsert = `insert into jugadores(usuario, password, fecha) values('${req.params.field1}', '${req.params.field2}', 'test')`;
  var postData = req.body;
  const sqlInsert = `INSERT INTO jugadores SET ?`;
  db.query(sqlInsert, postData, (err, result) => {
    res.send('Values inserted');
  })
});

app.listen(5000, () => {
  console.log("Server listening")
})
