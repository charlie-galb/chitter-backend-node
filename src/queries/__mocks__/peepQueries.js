const retrievePeeps = jest.fn().mockReturnValue([{ id: 1, body: 'mock peep', user_id: 1 }])
const savePeep = jest.fn()
const deletePeepById = jest.fn()

module.exports = {
  retrievePeeps,
  savePeep,
  deletePeepById
}
