const createServer = require("../../src/createServer")
const request = require('supertest');
const knex = require('../../db/db');

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

describe("Get /sessions", () => {
    test("if request good, returns 200 status and 50 latest peeps", async () => {
        await request(app)
        .get("/peeps")
        .expect(200)
        .then((response) => {
            expect(response.body.length).toEqual(3)
            expect(response.body[0].body).toEqual("test peep 1")
         })
    })
})