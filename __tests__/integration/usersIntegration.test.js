const createServer = require("../../createServer")
const request = require('supertest');
const pool = require("../../db");

beforeAll( async () => {
	return await pool.query(
        "CREATE TABLE users(user_id SERIAL PRIMARY KEY, handle VARCHAR (50) UNIQUE NOT NULL, password VARCHAR (100) NOT NULL, session_key VARCHAR(50), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"
        );
})

afterAll( async () => {
	return await pool.query("DROP TABLE users;");
})

const app = createServer()

describe("POST /users", () => {
    test("when handle is not already in use it returns 201 status and new user as json", async () => {
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
    test("when handle is already in use it returns 404 status and error message", async () => {
        const userData = {user: {handle:"kay", password:"differentpassword"}}
        await request(app)
        .post("/users")
        .send(userData)
        .then((response) => {
            expect(response.status).toBe(409)
            expect(response.text).toBe("Handle already taken")
         })
    })
})

describe("GET /users", () => {
    test("When the request is good it sends a 200 status and an array of user objects", async () => {
        await request(app)
        .get("/users")
        .expect(200)
        .then((response) => {
            expect(response.body.length).toBe(1)
            expect(response.body[0].user_id).toBe(1)
            expect(response.body[0].handle).toBe("kay")
         })
    })
})

describe("DELETE /users", () => {
    test("When the request is good it sends a 200 status and a confirmation message", async () => {
        await request(app)
        .delete("/users/1")
        .expect(200)
        .then((response) => {
            expect(response.text).toBe("User successfully deleted")
         })
    })
})