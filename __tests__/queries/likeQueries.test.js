const { saveLike } = require("../../src/queries/likeQueries");
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

describe('saveLike', () => {
    test("inserts a new like into the database", async () => {
        result = await saveLike(3, 1)
        expect(result.id).toEqual(4)
        expect(result.user_id).toEqual(1)
        expect(result.peep_id).toEqual(3)
    })
    test("throws an error if the combination of user and peep id matches another in the db", async () => {
        try {
            await saveLike(1, 3)
        } catch (error) {
            expect(error.message).toMatch(/duplicate key value violates unique/)
        }
    })
})