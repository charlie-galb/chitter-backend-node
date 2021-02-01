const createServer = require("./createServer")

const app = createServer()

app.listen(5000, () => {
    console.log("Server has started on port 5000")
});