const createServer = require("../../createServer")
const request = require('supertest');
const pool = require("../../db");

beforeEach( async () => {
	return await pool.query(
        "CREATE TABLE users(user_id SERIAL PRIMARY KEY, handle VARCHAR (50) UNIQUE, password VARCHAR (50), session_key VARCHAR(50), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"
        );
})

afterEach( async () => {
	return await pool.query("DROP TABLE users;");
})

const app = createServer()

test("POST /users", async () => {
    const userData = {user: {handle:"kay", password:"mypassword"}}
    await request(app)
    .post("/users")
    .send(userData)
    .expect(200)
    .then((response) => {
        console.log(response.body)
        // Check the response data
        expect(response.body.user_id).toBe(1)
        expect(response.body.handle).toBe("kay")
     })
    })