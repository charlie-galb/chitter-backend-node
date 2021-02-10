const createServer = require("../../src/createServer")
const request = require('supertest');
const knex = require('../../db/db');

beforeAll( async () => {
	return knex.migrate.latest();
})

afterAll( async () => {
	return knex.migrate
      .rollback()
      .then(() => knex.destroy());
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
            expect(response.body.id).toBe(1)
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
            expect(response.body[0].id).toBe(1)
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