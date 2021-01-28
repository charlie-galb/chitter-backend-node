const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// get users


// create user
app.post('/users', async (req, res) => {
    try {
        const { handle, password } = req.body;
        const newUser = await pool.query(
            "INSERT INTO users (handle, password) VALUES($1, $2)",
            [handle, password]
        );
        res.json(newUser)
    } catch (error) {
        console.error(error.message)
    }
});
// delete user
app.listen(5000, () => {
    console.log("Server has started on port 5000")
});