const express = require('express');
const router = express.Router();
const recipeModel = require('../models/recipeModel');

router.get('/', (req, res) => {
   recipeModel.getAllRecipes((err, recipes) => {
      res.render('recipeList', { recipes });
   });
});

router.get('/add', (req, res) => res.render('addRecipe'));
router.post('/add', (req, res) => {
   recipeModel.addRecipe(req.body.name, req.body.ingredients, req.body.instructions, req.body.difficulty, req.body.category, () => res.redirect('/'));
});

module.exports = router;