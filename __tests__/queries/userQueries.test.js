const db = require("../../db/db");
const { createUser, getAllUsers, deleteUser } = require("../../queries/userQueries");
const knex = require('../../db/db');

beforeAll( async () => {
	return knex.migrate.latest();
})

afterAll( async () => {
	return knex.migrate
      .rollback()
      .then(() => knex.destroy());
})

describe('createUser', () => {
    test("when handle is not already in use it inserts user data into db and returns id and handle", async () => {
        const testUser = {handle: 'Test Person', password: 'password'}
        result = await createUser(testUser)
        expect(result).toEqual({id: 1, handle: 'Test Person'})
    })
    test("when handle is already in use it throws an error", async () => {
        const testUser = {handle: 'Test Person', password: 'password'}
        try {
            await createUser(testUser)
        } catch(error) {
            expect(error.message).toMatch(/duplicate key value violates unique/)
        }
    })
})

describe('getAllUsers', () => {
    test("returns all users' handles and IDs as objects in an array", async () => {
        result = await getAllUsers()
        expect(result).toEqual([{id: 1, handle: "Test Person"}])
    })
})

describe('deleteUser', () => {
    test("Deletes specified user", async () => {
        await deleteUser(1)
        result = await getAllUsers()
        expect(result.length).toEqual(0)
    })
})