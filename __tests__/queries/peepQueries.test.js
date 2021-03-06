const { retrievePeeps, savePeep, deletePeepById } = require('../../src/queries/peepQueries')
const knex = require('../../db/db')
const { json } = require('express')

beforeAll(async () => {
  return knex.migrate.latest()
    .then(() => { return knex.seed.run() })
})

afterAll(async () => {
  return knex.migrate
    .rollback()
    .then(() => knex.destroy())
})

describe('retrievePeeps', () => {
  test("returns all users' handles and IDs as objects in an array", async () => {
    const result = await retrievePeeps()
    expect(result.length).toEqual(3)
    expect(result[0].id).toEqual(3)
    expect(result[2].id).toEqual(1)
    expect(result[2].body).toEqual('test peep 1')
    expect(result[2].likes.length).toEqual(1)
    expect(result[2].likes[0].user_id).toEqual(3)
    expect(result.length).toEqual(3)
    expect(result[2].likes.length).toEqual(1)
  })
})

describe('savePeep', () => {
  test('inserts a new peep into the database', async () => {
    mockPeepObj = { user_id: 1, body: 'creating a new test peep' }
    await savePeep(mockPeepObj)
    const result = await retrievePeeps()
    expect(result.length).toEqual(4)
    expect(result[0].body).toEqual('creating a new test peep')
    expect(result[0].likes).toEqual(null)
  })
})

describe('deletePeepById', () => {
  test('removes a peep from the database', async () => {
    await deletePeepById(1)
    const result = await retrievePeeps()
    expect(result[0].body).not.toEqual('Test peep 1')
  })
})
