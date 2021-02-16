const { getAllPeeps } = require("../../src/queries/peepQueries");
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

describe('getAllPeeps', () => {
    test("returns all users' handles and IDs as objects in an array", async () => {
        
        result = await getAllPeeps()
        expect(result[0].body).toEqual("test peep 1")
        expect(result.length).toEqual(3)
    })
})