const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./cookbook.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        ingredients TEXT,
        instructions TEXT,
        difficulty TEXT,
        category TEXT
    )`);
});

const getAllRecipes = (sortBy, callback) => {
    const validColumns = ['name', 'difficulty', 'category'];
    const column = validColumns.includes(sortBy) ? sortBy : 'name';
    const sql = `SELECT * FROM recipes ORDER BY ${column} ASC`;
    db.all(sql, (err, rows) => {
        callback(err, rows);
    });
};

const addRecipe = (name, ingredients, instructions, difficulty, category, callback) => {
    const sql = "INSERT INTO recipes (name, ingredients, instructions, difficulty, category) VALUES (?, ?, ?, ?, ?)";
    db.run(sql, [name, ingredients, instructions, difficulty, category], function(err) {
        callback(err, this.lastID);
    });
};

const getRecipeById = (id, callback) => {
    db.get("SELECT * FROM recipes WHERE id = ?", [id], (err, row) => {
        callback(err, row);
    });
};

const updateRecipe = (id, name, ingredients, instructions, difficulty, category, callback) => {
    const sql = `UPDATE recipes SET name = ?, ingredients = ?, instructions = ?, difficulty = ?, category = ? WHERE id = ?`;
    db.run(sql, [name, ingredients, instructions, difficulty, category, id], function(err) {
        callback(err);
    });
};

const deleteRecipe = (id, callback) => {
    db.run("DELETE FROM recipes WHERE id = ?", [id], (err) => {
        callback(err);
    });
};

module.exports = { getAllRecipes, addRecipe, getRecipeById, updateRecipe, deleteRecipe };