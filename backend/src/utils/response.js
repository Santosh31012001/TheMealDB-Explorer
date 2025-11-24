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
 * Standardized error response
 */
function createErrorResponse(message, statusCode = 500) {
    return {
        ok: false,
        error: message,
        cached: false,
        statusCode
    };
}

module.exports = {
    createResponse,
    createErrorResponse
};
