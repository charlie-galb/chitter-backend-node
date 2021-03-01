const createServer = require("../../src/createServer")
const request = require('supertest');
const knex = require('../../db/db');
const jwt = require("jsonwebtoken");

beforeAll( async () => {
    return knex.migrate.latest()
    .then(() => { return knex.seed.run(); });
})

afterAll( async () => {
	return knex.migrate
      .rollback()
      .then(() => knex.destroy());
})

const app = createServer()

const payload = {handle: 'mock handle'}
const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {algorithm: "HS256", expiresIn: 60 * 60})

describe("GET /peeps", () => {
    test("if request good, returns 200 status and 50 latest peeps", async () => {
        await request(app)
        .get("/peeps")
        .set('authorization', token)
        .expect(200)
        .then((response) => {
            expect(response.body.length).toEqual(3)
            expect(response.body[0].body).toEqual("test peep 3")
         })
    })
    test("if no auth token, returns 403 status and error message", async () => {
        await request(app)
        .get("/peeps")
        .expect(403)
        .then((response) => {
            expect(response.body.message).toEqual("Unauthorized Access!")
         })
    })
    test("if invalid auth token, returns 403 status and error message", async () => {
        const token = "invalid_token"
        await request(app)
        .get("/peeps")
        .set('authorization', token)
        .expect(401)
        .then((response) => {
            expect(response.body.message).toEqual("Unauthorized Access!")
         })
    })
})

describe("POST /peeps", () => {
    test("if request is good, returns 201 status and newly created peep", async () => {
        const peep = {peep: {user_id:"1", body:"Not a real peep"}}
        await request(app)
        .post("/peeps")
        .set('authorization', token)
        .send(peep)
        .expect(201)
        .then((response) => {
            expect(response.body.user_id).toEqual(1)
            expect(response.body.id).toEqual(4)
            expect(response.body.body).toEqual("Not a real peep")
         })
    })
})

describe("DELETE /peeps", () => {
    test("if request is good, returns 200 status and a confirmation message", async () => {
        const peep = {peep: {user_id:"1", body:"Not a real peep"}}
        await request(app)
        .delete("/peeps/1")
        .set('authorization', token)
        .expect(200)
        .then((response) => {
            expect(response.text).toEqual("Peep successfully deleted")
         })
    })
})