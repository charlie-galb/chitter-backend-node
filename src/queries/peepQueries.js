const db = require("../../db/db");

const getAllPeeps = () => {
    return db
      .select("*")
      .from("peeps")
      .then(rows => rows);
};

const createPeep = (newPeep) => {
    return db
      .insert(newPeep)
      .into("peeps")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
};

module.exports = {
    getAllPeeps,
    createPeep
}