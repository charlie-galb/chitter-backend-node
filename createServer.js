const express = require("express")
const cors = require("cors");
usersRouter = require('./routers/usersRouter');
sessionsRouter = require('./routers/sessionsRouter'); 

function createServer() {
	const app = express()
	app.use(cors());
    app.use(express.json());
	app.use('/users', usersRouter);
	app.use('/sessions', sessionsRouter);
	return app
}

module.exports = createServer