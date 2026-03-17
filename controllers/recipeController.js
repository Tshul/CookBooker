const express = require('express');
const router = express.Router();
const recipeModel = require('../models/recipeModel');

router.get('/', (req, res) => {
    const sortBy = req.query.sort || 'name';
    recipeModel.getAllRecipes(sortBy, (err, recipes) => {
        if (err) return res.status(500).send('Error getting recipes');
        res.render('recipeList', { recipes });
    });
});

router.get('/add', (req, res) => res.render('addRecipe'));

router.post('/add', (req, res) => {
    const { name, ingredients, instructions, difficulty, category } = req.body;
    recipeModel.addRecipe(name, ingredients, instructions, difficulty, category, (err) => {
        if (err) return res.status(500).send('Error adding recipe');
        res.redirect('/');
    });
});

router.get('/edit/:id', (req, res) => {
    recipeModel.getRecipeById(req.params.id, (err, recipe) => {
        if (err || !recipe) return res.status(404).send('Recipe not found');
        res.render('editRecipe', { recipe });
    });
});

router.post('/edit/:id', (req, res) => {
    const recipeId = req.params.id;
    const { name, ingredients, instructions, difficulty, category } = req.body;
    
    recipeModel.updateRecipe(recipeId, name, ingredients, instructions, difficulty, category, (err) => {
        if (err) {
            console.error("Update Error:", err);
            return res.status(500).send('Error updating recipe');
        }
        res.redirect(`/recipe/${recipeId}`);
    });
});

router.get('/recipe/:id', (req, res) => {
    recipeModel.getRecipeById(req.params.id, (err, recipe) => {
        if (err || !recipe) return res.status(404).send('Recipe not found');
        res.render('recipeDetails', { recipe });
    });
});

router.post('/delete/:id', (req, res) => {
    recipeModel.deleteRecipe(req.params.id, (err) => {
        if (err) return res.status(500).send('Error deleting recipe');
        res.redirect('/');
    });
});

module.exports = router;