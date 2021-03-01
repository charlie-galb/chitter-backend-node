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

describe("PUT /peeps/1/likes/3", () => {
    test("if request is good, returns 200 status and newly created like", async () => {
        await request(app)
        .put("/peeps/3/likes/1")
        .set('authorization', token)
        .expect(200)
        .then((response) => {
            expect(response.body.user_id).toEqual(1)
            expect(response.body.peep_id).toEqual(3)
            expect(response.body.id).toEqual(4)
         })
    })
})

describe("DELETE /peeps/1/likes/2", () => {
    test("if request is good, returns 200 status and a confirmation message", async () => {
        await request(app)
        .delete("/peeps/1/likes/2")
        .set('authorization', token)
        .expect(200)
        .then((response) => {
            expect(response.text).toEqual("Like successfully deleted")
         })
    })
})