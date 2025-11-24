# TheMealDB Explorer - Backend

Simple Express API server that interfaces with TheMealDB API.

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── index.js          # Configuration and environment variables
│   ├── controllers/
│   │   └── mealController.js # Request handlers
│   ├── routes/
│   │   └── mealRoutes.js     # Route definitions
│   ├── services/
│   │   └── mealService.js    # Business logic and API calls
│   ├── utils/
│   │   ├── cache.js          # LRU cache implementation
│   │   └── response.js       # Response formatters
│   ├── app.js                # Express app setup
│   └── server.js             # Server entry point
├── package.json
└── README.md
```

## Features

- ✅ MVC architecture with separation of concerns
- ✅ RESTful API with 6 endpoints
- ✅ In-memory LRU caching with TTL
- ✅ CORS enabled
- ✅ Standardized response format
- ✅ Error handling
- ✅ Service layer for business logic
- ✅ Controller layer for request handling
- ✅ Routes for endpoint definitions

## Installation

```bash
cd backend
npm install
```

## Running the Server

```bash
# Production
npm start

# Development (with nodemon)
npm run dev
```

The server will start on **http://localhost:5000**

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/categories` | GET | Get all meal categories |
| `/api/categories/:category` | GET | Get meals by category |
| `/api/meals?search=term` | GET | Search meals by name |
| `/api/meals/random` | GET | Get a random meal |
| `/api/meals/:id` | GET | Get meal details by ID |

## Response Format

All endpoints return responses in this format:

```json
{
  "ok": true,
  "data": {},
  "cached": false
}
```

Error responses:

```json
{
  "ok": false,
  "error": "Error message",
  "cached": false,
  "statusCode": 500
}
```

## Architecture

### Config Layer
- Centralizes configuration and environment variables
- Easy to manage settings across the application

### Service Layer
- Handles business logic and external API calls
- Manages caching strategy
- Isolated from HTTP concerns

### Controller Layer
- Processes HTTP requests
- Validates input
- Calls appropriate service methods
- Formats responses

### Routes Layer
- Defines API endpoints
- Maps URLs to controller methods
- Clean separation of routing logic

### Utils Layer
- Reusable utilities (cache, response formatters)
- Shared across the application

## Environment

- Node.js v14 or higher recommended
- Port: 5000 (default, configurable via `process.env.PORT`)

## Cache Configuration

- **TTL**: 5 minutes (configurable in `src/config/index.js`)
- **Max Size**: 100 entries (configurable in `src/config/index.js`)
- Random meals are not cached to ensure variety
