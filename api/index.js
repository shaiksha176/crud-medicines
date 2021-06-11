const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8080;
const mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb",
});

db.connect(function (err) {
  if (err) throw err;
  // var sql =
  //   "CREATE TABLE medicines (id int NOT NULL AUTO_INCREMENT, name VARCHAR(255), frequency VARCHAR(255), dosage varchar(255),user_id int, primary key (id),  FOREIGN KEY (user_id) REFERENCES users(id))";

  //   var sql = "SELECT * FROM medicines where user_id = 1";
  //   let data = [];
  //   db.query(sql, function (err, result) {
  //     if (err) throw err;
  //     data = result;
  //     console.log(data[0].name);
  //   });
  console.log("Connected!");
});

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = await req.body;

  try {
    var sql = "INSERT INTO users (name, email,password) VALUES (?,?,?)";
    const result = db.query(sql, [name, email, password]);
    if (result) res.send("registration successfull");
    else res.send("registration unsuccessfull");
  } catch (error) {
    console.log(error);
    res.send("Some error has occured. Please try again");
  }
});

app.post("/api/add", (req, res) => {
  console.log(req.body);
  const { name, dosage, frequency, id } = req.body;
  var sql =
    "INSERT INTO medicines(name,dosage,frequency,user_id) VALUES (?,?,?,?)";
  db.query(sql, [name, dosage, frequency, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const id = req.params.id;
  var sql = "SELECT * FROM medicines WHERE user_id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

app.delete("/api/delete/:id", (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  var sql = "DELETE FROM medicines WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

app.put("/api/update", (req, res) => {
  const { id, name, dosage, frequency, user_id } = req.body;
  var sql = `UPDATE medicines SET name = ?, dosage = ?, frequency = ? WHERE  id = ?`;
  db.query(sql, [name, dosage, frequency, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

app.put("/api/update/profile", (req, res) => {
  const { id, name, email, password } = req.body;
  var sql = `UPDATE users SET name = ?, email = ?, password = ? WHERE  id = ?`;
  db.query(sql, [name, email, password, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.json(result);
    }
  });
});

app.post("/api/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email=? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) console.log(error);
      else {
        if (result.length > 0) {
          console.log(result[0].id);
          const payload = {
            id: result[0].id,
            name: result[0].name,
          };
          console.log(payload);
          const token = jwt.sign(payload, "secret", { expiresIn: "1h" });

          res.status(200).json({
            success: true,
            token,
            result,
          });
        } else
          res.send({
            message: "User or Password do not match",
            success: false,
          });
      }
    }
  );
});

app.listen(port, () => console.log("server is running on port " + port));
