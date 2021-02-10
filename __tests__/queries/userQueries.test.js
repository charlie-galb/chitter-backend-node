const { createUser, getAllUsers, deleteUser, findUser, storeAuthToken } = require("../../src/queries/userQueries");
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

describe('findUser', () => {
    test("returns a single user that matches the handle and password provided", async () => {
        const testUser = {handle: 'Test Person', password: 'password'}
        result = await findUser(testUser)
        expect(result).toEqual({id: 1, handle: "Test Person", password: "password"})
    })
})

describe('storeAuthToken', () => {
    test("stores user's JWT refresh token", async () => {
        const authToken = "ajfk34tgjdvij56"
        result = await storeAuthToken('Test Person', authToken)
        expect(result).toEqual({"handle": "Test Person", "id": 1})
    })
})

describe('deleteUser', () => {
    test("Deletes specified user", async () => {
        await deleteUser(1)
        result = await getAllUsers()
        expect(result.length).toEqual(0)
    })
})