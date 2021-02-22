const express = require("express")
const cors = require("cors");
usersRouter = require('./routers/usersRouter');
sessionsRouter = require('./routers/sessionsRouter'); 
peepsRouter = require('./routers/peepsRouter'); 

function createServer() {
	const app = express()
	app.use(cors());
    app.use(express.json());
	app.get('/', function (req, res) {
		res.send('Hello World!')
	  })
	app.use('/users', usersRouter);
	app.use('/sessions', sessionsRouter);
	app.use('/peeps', peepsRouter);
	return app
}

module.exports = createServer