const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cache = require('./cache');

const app = express();
const PORT = 5000;
const MEALDB_API = 'https://www.themealdb.com/api/json/v1/1';

// Middleware
app.use(cors());
app.use(express.json());

/**
 * Standardized response wrapper
 */
function createResponse(data, cached = false) {
    return {
        ok: true,
        data,
        cached
    };
}

/**
 * Error handler
 */
function handleError(res, error, message = 'An error occurred') {
    console.error(message, error.message);
    res.status(500).json({
        ok: false,
        error: message,
        cached: false
    });
}

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
        const response = await axios.get(`${MEALDB_API}${endpoint}`);
        cache.set(cacheKey, response.data);
        return { data: response.data, cached: false };
    } catch (error) {
        throw error;
    }
}

// ============= API ENDPOINTS =============

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
    res.json({ ok: true });
});

/**
 * GET /api/categories
 * Get list of meal categories
 */
app.get('/api/categories', async (req, res) => {
    try {
        const { data, cached } = await fetchFromMealDB('/categories.php', 'categories');
        res.json(createResponse(data.categories, cached));
    } catch (error) {
        handleError(res, error, 'Failed to fetch categories');
    }
});

/**
 * GET /api/categories/:category
 * Get meals by category
 */
app.get('/api/categories/:category', async (req, res) => {
    const { category } = req.params;
    const cacheKey = `category_${category}`;

    try {
        const { data, cached } = await fetchFromMealDB(`/filter.php?c=${category}`, cacheKey);
        res.json(createResponse(data.meals, cached));
    } catch (error) {
        handleError(res, error, `Failed to fetch meals for category: ${category}`);
    }
});

/**
 * GET /api/meals?search=term
 * Search meals by name
 */
app.get('/api/meals', async (req, res) => {
    const { search } = req.query;

    if (!search) {
        return res.status(400).json({
            ok: false,
            error: 'Search term is required',
            cached: false
        });
    }

    const cacheKey = `search_${search}`;

    try {
        const { data, cached } = await fetchFromMealDB(`/search.php?s=${search}`, cacheKey);
        res.json(createResponse(data.meals, cached));
    } catch (error) {
        handleError(res, error, `Failed to search meals: ${search}`);
    }
});

/**
 * GET /api/meals/random
 * Get a random meal
 */
app.get('/api/meals/random', async (req, res) => {
    try {
        // Don't cache random meals
        const response = await axios.get(`${MEALDB_API}/random.php`);
        res.json(createResponse(response.data.meals, false));
    } catch (error) {
        handleError(res, error, 'Failed to fetch random meal');
    }
});

/**
 * GET /api/meals/:id
 * Get meal details by ID
 */
app.get('/api/meals/:id', async (req, res) => {
    const { id } = req.params;
    const cacheKey = `meal_${id}`;

    try {
        const { data, cached } = await fetchFromMealDB(`/lookup.php?i=${id}`, cacheKey);
        res.json(createResponse(data.meals ? data.meals[0] : null, cached));
    } catch (error) {
        handleError(res, error, `Failed to fetch meal details: ${id}`);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});
