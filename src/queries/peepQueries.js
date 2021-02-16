const db = require("../../db/db");

const getAllPeeps = () => {
    return db
      .select("*")
      .from("peeps")
      .then(rows => rows);
};

module.exports = {
    getAllPeeps
}