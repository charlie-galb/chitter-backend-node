const createServer = require("../../createServer")
const request = require('supertest');
const pool = require("../../db");

beforeAll( async () => {
	return await pool.query(
        "CREATE TABLE users(user_id SERIAL PRIMARY KEY, handle VARCHAR (50) UNIQUE, password VARCHAR (50), session_key VARCHAR(50), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"
        );
})

afterAll( async () => {
	return await pool.query("DROP TABLE users;");
})

const app = createServer()

test("POST /users", async () => {
    const userData = {user: {handle:"kay", password:"mypassword"}}
    await request(app)
    .post("/users")
    .send(userData)
    .expect(201)
    .then((response) => {
        expect(response.body.user_id).toBe(1)
        expect(response.body.handle).toBe("kay")
     })
})

test("GET /users", async () => {
    await request(app)
    .get("/users")
    .expect(200)
    .then((response) => {
        expect(response.body.length).toBe(1)
        expect(response.body[0].user_id).toBe(1)
        expect(response.body[0].handle).toBe("kay")
     })
})

test("DELETE /users", async () => {
    await request(app)
    .delete("/users/1")
    .expect(200)
    .then((response) => {
        expect(response.text).toBe("User successfully deleted")
     })
})