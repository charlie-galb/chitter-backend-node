const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// get users
app.get('/users', async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows)
    } catch (error) {
        console.error(error.message)
    }
});
// create user
app.post('/users', async (req, res) => {
    try {
        const { handle, password } = req.body;
        const newUser = await pool.query(
            "INSERT INTO users (handle, password) VALUES($1, $2) RETURNING *",
            [handle, password]
        );
        res.json(newUser.rows(0))
    } catch (error) {
        console.error(error.message)
    }
});
// delete user
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE user_id = $1", [id])
        res.json("User was successfully deleted")
    } catch (error) {
        console.error(error.message)
    }
});

app.listen(5000, () => {
    console.log("Server has started on port 5000")
});