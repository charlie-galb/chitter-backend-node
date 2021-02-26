const db = require("../../db/db");

const saveLike = (peepId, userId) => {
    return db
      .insert({peep_id: peepId, user_id: userId})
      .into("likes")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
};

module.exports = {
    saveLike
}