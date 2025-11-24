# TheMealDB Explorer - Frontend

React + Vite frontend for exploring meals from TheMealDB API.

## Features

- ✅ Search meals by name
- ✅ Random meal generator
- ✅ Browse categories
- ✅ View detailed meal information
- ✅ Responsive design
- ✅ Clean, modern UI

## Installation

```bash
cd frontend
npm install
```

## Running the Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:5173** (or the port Vite assigns)

## Pages

### Home (`/`)
- Search for meals by name
- "I'm Feeling Hungry" button for random meal
- Display search results in card grid

### Categories (`/categories`)
- Browse all meal categories
- Click category to view meals
- Navigate back to categories

### Meal Details (`/meal/:id`)
- View meal name and image
- See ingredients with measurements
- Read cooking instructions
- Watch YouTube tutorial video (if available)

## API Proxy

The frontend is configured to proxy all `/api` requests to the backend server at `http://localhost:5000`.

Make sure the backend server is running before starting the frontend.

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

## Technologies

- React 18
- Vite 5
- React Router DOM 6
- Axios
- Vanilla CSS
