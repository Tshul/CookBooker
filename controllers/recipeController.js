const express = require('express');
const router = express.Router();
const recipeModel = require('../models/recipeModel');

router.get('/', (req, res) => {
   recipeModel.getAllRecipes((err, recipes) => {
      res.render('recipeList', { recipes });
   });
});

module.exports = router;