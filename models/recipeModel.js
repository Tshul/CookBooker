const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./cookbook.db');
module.exports = {};

const getAllRecipes = (callback) => {
   db.all("SELECT * FROM recipes", (err, rows) => {
      callback(err, rows);
   });
};

const addRecipe = (name, ingredients, instructions, difficulty, category, callback) => {
   db.run("INSERT INTO recipes (name, ingredients, instructions, difficulty, category) VALUES (?, ?, ?, ?, ?)", 
   [name, ingredients, instructions, difficulty, category], callback);
};

const getRecipeById = (id, callback) => {
   db.get("SELECT * FROM recipes WHERE id = ?", [id], callback);
};

const updateRecipe = (id, name, ingredients, instructions, difficulty, category, callback) => {
   const sql = `UPDATE recipes SET name=?, ingredients=?, instructions=?, difficulty=?, category=? WHERE id=?`;
   db.run(sql, [name, ingredients, instructions, difficulty, category, id], callback);
};

module.exports = { getAllRecipes, addRecipe, updateRecipe };