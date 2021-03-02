const db = require('../../db/db')

const saveLike = (peepId, userId) => {
  return db
    .insert({ peep_id: peepId, user_id: userId })
    .into('likes')
    .returning('*')
    .then(rows => {
      return rows[0]
    })
}

const deleteLikeByForeignKeys = (peepId, userId) => {
  return db('likes')
    .where({ peep_id: peepId, user_id: userId })
    .delete()
}

const findLikeByForeignKeys = (peepId, userId) => {
  return db
    .select('*')
    .from('likes')
    .where({ user_id: userId, peep_id: peepId })
    .then(rows => rows[0])
}

module.exports = {
  saveLike,
  deleteLikeByForeignKeys,
  findLikeByForeignKeys
}
