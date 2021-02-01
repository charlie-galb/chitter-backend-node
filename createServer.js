const express = require("express")
const cors = require("cors");
usersRouter = require('./routers/usersRouter');

function createServer() {
	const app = express()
	app.use(cors());
    app.use(express.json());
    app.use('/users', usersRouter);
	return app
}

module.exports = createServer