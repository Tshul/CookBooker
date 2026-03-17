const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./cookbook.db');
module.exports = {};

const getAllRecipes = (callback) => {
   db.all("SELECT * FROM recipes", (err, rows) => {
      callback(err, rows);
   });
};

module.exports = { getAllRecipes };