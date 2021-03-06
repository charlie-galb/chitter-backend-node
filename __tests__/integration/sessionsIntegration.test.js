const createServer = require('../../src/createServer')
const request = require('supertest')
const knex = require('../../db/db')

beforeAll(async () => {
  return knex.migrate.latest()
    .then(() => { return knex.seed.run() })
})

afterAll(async () => {
  return knex.migrate
    .rollback()
    .then(() => knex.destroy())
})

const app = createServer()

describe('POST /sessions', () => {
  test('when user info matches db info it returns 201 status and new user as json', async () => {
    const validUserData = { session: { handle: 'nigel', password: 'password' } }
    await request(app)
      .post('/sessions')
      .send(validUserData)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('token')
      })
  })
  test("when user info is missing it returns 401 status and message: 'No user by that name'", async () => {
    const invalidUserDataOne = { session: { handle: 'Petunia', password: 'password' } }
    await request(app)
      .post('/sessions')
      .send(invalidUserDataOne)
      .expect(401)
      .then((response) => {
        expect(response.text).toEqual('No user by that name')
      })
  })
  test("when user does not match the db it returns 401 status and message: 'Unauthorized Access!'", async () => {
    const invalidUserDataTwo = { session: { handle: 'nigel', password: 'wrongPassword' } }
    await request(app)
      .post('/sessions')
      .send(invalidUserDataTwo)
      .expect(401)
      .then((response) => {
        expect(response.text).toEqual('Unauthorized Access!')
      })
  })
})
