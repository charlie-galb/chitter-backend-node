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

describe("Get /peeps", () => {
    test("if request good, returns 200 status and 50 latest peeps", async () => {
        const payload = {handle: 'mock handle'}
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: 60 * 60
        })
        await request(app)
        .get("/peeps")
        .set('authorization', token)
        .expect(200)
        .then((response) => {
            expect(response.body.length).toEqual(3)
            expect(response.body[0].body).toEqual("test peep 1")
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