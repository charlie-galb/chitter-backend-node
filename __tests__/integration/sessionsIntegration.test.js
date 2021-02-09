const createServer = require("../../createServer")
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

describe("POST /sessions", () => {
    test("when user info matches db info it returns 201 status and new user as json", async () => {
        const userData = {session: {handle:"nigel", password:"password"}}
        await request(app)
        .post("/sessions")
        .send(userData)
        .expect(200)
        .then((response) => {
            expect(response.body).toHaveProperty("token")
         })
    })
})