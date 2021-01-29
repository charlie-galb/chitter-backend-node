const express = require('express');
const app = express();
const cors = require("cors");
usersRouter = require('./routers/usersRouter');


app.use(cors());
app.use(express.json());
app.use('/users', usersRouter);

app.listen(5000, () => {
    console.log("Server has started on port 5000")
});