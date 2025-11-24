module.exports = {
    PORT: process.env.PORT || 5000,
    MEALDB_API_URL: 'https://www.themealdb.com/api/json/v1/1',
    CACHE_TTL: 5 * 60 * 1000, // 5 minutes
    CACHE_MAX_SIZE: 100
};
