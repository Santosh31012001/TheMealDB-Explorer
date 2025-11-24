const mealService = require('../services/mealService');
const { createResponse, createErrorResponse } = require('../utils/response');

/**
 * Health check endpoint
 */
exports.healthCheck = (req, res) => {
    res.json({ ok: true });
};

/**
 * Get all meal categories
 */
exports.getCategories = async (req, res) => {
    try {
        const { data, cached } = await mealService.getCategories();
        res.json(createResponse(data.categories, cached));
    } catch (error) {
        console.error('Failed to fetch categories:', error.message);
        const errorResponse = createErrorResponse('Failed to fetch categories');
        res.status(errorResponse.statusCode).json(errorResponse);
    }
};

/**
 * Get meals by category
 */
exports.getMealsByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const { data, cached } = await mealService.getMealsByCategory(category);
        res.json(createResponse(data.meals, cached));
    } catch (error) {
        console.error(`Failed to fetch meals for category ${category}:`, error.message);
        const errorResponse = createErrorResponse(`Failed to fetch meals for category: ${category}`);
        res.status(errorResponse.statusCode).json(errorResponse);
    }
};

/**
 * Search meals by name
 */
exports.searchMeals = async (req, res) => {
    const { search } = req.query;

    if (!search) {
        const errorResponse = createErrorResponse('Search term is required', 400);
        return res.status(errorResponse.statusCode).json(errorResponse);
    }

    try {
        const { data, cached } = await mealService.searchMeals(search);
        res.json(createResponse(data.meals, cached));
    } catch (error) {
        console.error(`Failed to search meals: ${search}:`, error.message);
        const errorResponse = createErrorResponse(`Failed to search meals: ${search}`);
        res.status(errorResponse.statusCode).json(errorResponse);
    }
};

/**
 * Get a random meal
 */
exports.getRandomMeal = async (req, res) => {
    try {
        const { data, cached } = await mealService.getRandomMeal();
        res.json(createResponse(data.meals, cached));
    } catch (error) {
        console.error('Failed to fetch random meal:', error.message);
        const errorResponse = createErrorResponse('Failed to fetch random meal');
        res.status(errorResponse.statusCode).json(errorResponse);
    }
};

/**
 * Get meal by ID
 */
exports.getMealById = async (req, res) => {
    const { id } = req.params;

    try {
        const { data, cached } = await mealService.getMealById(id);
        res.json(createResponse(data.meals ? data.meals[0] : null, cached));
    } catch (error) {
        console.error(`Failed to fetch meal details: ${id}:`, error.message);
        const errorResponse = createErrorResponse(`Failed to fetch meal details: ${id}`);
        res.status(errorResponse.statusCode).json(errorResponse);
    }
};
