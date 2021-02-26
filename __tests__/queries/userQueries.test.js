const { saveUser, retrieveUsers, deleteUserById, findUserByHandle, storeAuthToken } = require("../../src/queries/userQueries");
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

describe('retrieveUsers', () => {
    test("returns all users' handles and IDs as objects in an array", async () => {
        result = await retrieveUsers()
        expect(result.length).toEqual(3)
        expect(result[0].handle).toEqual("nigel")
    })
})

describe('saveUser', () => {
    test("when handle is not already in use it inserts user data into db and returns id and handle", async () => {
        const testUser = {id: 4, handle: 'Mona', password: 'password'}
        result = await saveUser(testUser)
        expect(result).toEqual({id: 4, handle: 'Mona'})
    })
    test("when handle is already in use it throws an error", async () => {
        const seededUser = {handle: 'nigel', password: 'password'}
        try {
            await saveUser(seededUser)
        } catch(error) {
            expect(error.message).toMatch(/duplicate key value violates unique/)
        }
    })
})

describe('findUserByHandle', () => {
    test("returns a single user that matches the handle and password provided", async () => {
        result = await findUserByHandle("nigel")
        expect(result.id).toEqual(1)
        expect(result.handle).toEqual("nigel")
    })
})

describe('storeAuthToken', () => {
    test("stores user's JWT refresh token", async () => {
        const authToken = "ajfk34tgjdvij56"
        result = await storeAuthToken('nigel', authToken)
        expect(result.handle).toEqual("nigel")
    })
})

describe('deleteUserById', () => {
    test("Deletes specified user", async () => {
        await deleteUserById(1)
        result = await retrieveUsers()
        expect(result[0].handle).not.toEqual("nigel")
    })
})