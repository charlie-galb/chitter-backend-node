const pool = require("../../db");
const { createUser, getAllUsers, deleteUser } = require("../../queries/userQueries");
const userQueries = require('../../queries/userQueries')

beforeAll( async () => {
	return await pool.query(
        "CREATE TABLE users(user_id SERIAL PRIMARY KEY, handle VARCHAR (50) UNIQUE NOT NULL, password VARCHAR (50) NOT NULL, session_key VARCHAR(50), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"
        );
})

afterAll( async () => {
	return await pool.query("DROP TABLE users;");
})

describe('createUser', () => {
    test("when handle is not already in use it inserts user data into db and returns id and handle", async () => {
        const testUser = {handle: 'Test Person', password: 'password'}
        result = await createUser(testUser)
        expect(result.rows[0]).toEqual({user_id: 1, handle: 'Test Person'})
    })
    test("when handle is already in use it throws an error", async () => {
        const testUser = {handle: 'Test Person', password: 'password'}
        try {
            await createUser(testUser)
        } catch(error) {
            expect(error.message).toEqual('duplicate key value violates unique constraint "users_handle_key"')
        }
    })
})

describe('getAllUsers', () => {
    test("returns all users' handles and IDs as objects in an array", async () => {
        result = await getAllUsers()
        expect(result.rows).toEqual([{user_id: 1, handle: "Test Person"}])
    })
})

describe('deleteUser', () => {
    test("Deletes specified user", async () => {
        result = await deleteUser()
        expect(result.rows).toEqual([])
    })
})