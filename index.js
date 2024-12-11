const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// const errorStatus = (req, res) => {
//   res.status(200).json({ name: "Sandy" });
// };

// const routeHandler = (req, res) => {
//   res.json({ name: "Sandy" });
// };

// app.get("/", routeHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "walled_db",
  password: "1234",
  port: 5432,
});

const getUser = (req, res) => {
  pool.query("select * from users", (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).json(result.rows);
  });
};

const createUsers = (req, res) => {
  const { name, password, email, balance, account_number, avatar_url } =
    req.body;
  pool.query(
    "INSERT INTO users (name, password, email, balance, account_number, avatar_url) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [name, password, email, balance, account_number, avatar_url],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json(results.rows[0]);
    }
  );
};

// const createMovie = (req,res) => {
//   const{movie_title, movie_genre, duration}
// }

//Walled
app.get("/users", getUser);
app.post("/users", createUsers);

// app.get("/movies", getMovies);

//resource
// app.get("/movies", routeHandler);
// app.post("/movies", routeHandler);
// app.put("/movies/:id", routeHandler);
// app.delete("/movies/:id", routeHandler);

// app.get("/tickets", routeHandler);
