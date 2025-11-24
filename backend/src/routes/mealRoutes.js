const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

// Health check
router.get('/health', mealController.healthCheck);

// Categories
router.get('/categories', mealController.getCategories);
router.get('/categories/:category', mealController.getMealsByCategory);

// Meals
router.get('/meals', mealController.searchMeals);
router.get('/meals/random', mealController.getRandomMeal);
router.get('/meals/:id', mealController.getMealById);

module.exports = router;
