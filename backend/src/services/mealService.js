const axios = require('axios');
const cache = require('../utils/cache');
const { MEALDB_API_URL } = require('../config');

/**
 * Fetch from MealDB API with caching
 */
async function fetchFromMealDB(endpoint, cacheKey) {
    // Check cache first
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        return { data: cachedData, cached: true };
    }

    // Fetch from API
    try {
        const response = await axios.get(`${MEALDB_API_URL}${endpoint}`);
        cache.set(cacheKey, response.data);
        return { data: response.data, cached: false };
    } catch (error) {
        throw error;
    }
}

/**
 * Get all meal categories
 */
async function getCategories() {
    return await fetchFromMealDB('/categories.php', 'categories');
}

/**
 * Get meals by category
 */
async function getMealsByCategory(category) {
    const cacheKey = `category_${category}`;
    return await fetchFromMealDB(`/filter.php?c=${category}`, cacheKey);
}

/**
 * Search meals by name
 */
async function searchMeals(searchTerm) {
    const cacheKey = `search_${searchTerm}`;
    return await fetchFromMealDB(`/search.php?s=${searchTerm}`, cacheKey);
}

/**
 * Get random meal
 */
async function getRandomMeal() {
    // Don't cache random meals
    const response = await axios.get(`${MEALDB_API_URL}/random.php`);
    return { data: response.data, cached: false };
}

/**
 * Get meal by ID
 */
async function getMealById(id) {
    const cacheKey = `meal_${id}`;
    return await fetchFromMealDB(`/lookup.php?i=${id}`, cacheKey);
}

module.exports = {
    getCategories,
    getMealsByCategory,
    searchMeals,
    getRandomMeal,
    getMealById
};
