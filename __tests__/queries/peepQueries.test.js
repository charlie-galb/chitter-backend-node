const { retrievePeeps, savePeep, deletePeepById } = require("../../src/queries/peepQueries");
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
        result = await retrievePeeps()
        expect(result[0].body).toEqual("test peep 1")
        expect(result.length).toEqual(3)
    })
})

describe('savePeep', () => {
    test("inserts a new peep into the database", async () => {
        mockPeepObj = {user_id: 1, body: "creating a new test peep"}
        await savePeep(mockPeepObj)
        result = await retrievePeeps()
        expect(result.length).toEqual(4)
        expect(result[3].body).toEqual("creating a new test peep")
    })
})

describe('deletePeepById', () => {
    test("removes a peep from the database", async () => {
        await deletePeepById(1)
        result = await retrievePeeps()
        expect(result[0].body).not.toEqual("Test peep 1")
    })
})