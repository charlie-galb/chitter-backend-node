const db = require('../../db/db')

const retrievePeeps = () => {
  return db('peeps')
    .leftJoin('likes', 'peeps.id', 'likes.peep_id')
    .leftJoin('users', 'users.id', 'peeps.user_id')
    .select([
      'peeps.id',
      'peeps.user_id',
      'peeps.body',
      'peeps.created_at',
      'peeps.updated_at',
      db.raw('COALESCE (json_strip_nulls(json_build_object(\'id\', users.id, \'handle\', users.handle))) as user'),
      db.raw('CASE WHEN likes.peep_id IS NOT NULL THEN ARRAY_AGG(json_build_object(\'id\', likes.id, \'user_id\', likes.user_id)) ELSE NULL END as likes')
    ])
    .orderBy('peeps.id', 'desc')
    .groupBy('peeps.id', 'peeps.body', 'users.id', 'users.handle', 'likes.peep_id')
    .then(rows => rows)
}

const savePeep = (newPeep) => {
  return db
    .insert(newPeep)
    .into('peeps')
    .returning('*')
    .then(rows => {
      return rows[0]
    })
}

const deletePeepById = (id) => {
  return db('peeps')
    .where({ id })
    .delete()
}

module.exports = {
  retrievePeeps,
  savePeep,
  deletePeepById
}
