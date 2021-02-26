const db = require("../../db/db");

const retrievePeeps = () => {
    return db
      .select("*")
      .from("peeps")
      .then(rows => rows);
};

const savePeep = (newPeep) => {
    return db
      .insert(newPeep)
      .into("peeps")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
};

const deletePeepById = (id) => {
  return db("peeps")
    .where({ id })
    .delete();
};

module.exports = {
    retrievePeeps,
    savePeep,
    deletePeepById
}