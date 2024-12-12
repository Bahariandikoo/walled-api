const pool = require("../db/db");

const getUser = (req, res) => {
  pool.query("select * from users", (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).json(result.rows);
  });
};

const findUserByEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM users where email = $1", [
      email,
    ]);
    return result;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const createUser = async (user) => {
  const { name, email, password, balance, account_number, avatar_url } = user;

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password, balance, account_number, avatar_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, email, password, balance, account_number, avatar_url]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(
      `Database error occurred while creating the user: ${error.message}`
    );
  }
};

module.exports = { getUser, createUser, findUserByEmail };
