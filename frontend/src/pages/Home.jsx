import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Home() {
    const [searchTerm, setSearchTerm] = useState('')
    const [meals, setMeals] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [showResults, setShowResults] = useState(false)
    const navigate = useNavigate()

    // Fetch featured categories on mount
    useEffect(() => {
        fetchFeaturedCategories()
    }, [])

    const fetchFeaturedCategories = async () => {
        try {
            const response = await axios.get('/api/categories')
            if (response.data.ok) {
                // Get first 6 categories for quick access
                setCategories(response.data.data?.slice(0, 6) || [])
            }
        } catch (err) {
            console.error('Failed to fetch categories:', err)
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchTerm.trim()) return

        setLoading(true)
        setError(null)
        setShowResults(true)

        try {
            const response = await axios.get(`/api/meals?search=${searchTerm}`)
            if (response.data.ok) {
                setMeals(response.data.data || [])
            }
        } catch (err) {
            setError('Failed to search meals. Please try again.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleRandomMeal = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await axios.get('/api/meals/random')
            if (response.data.ok && response.data.data) {
                const meal = response.data.data[0]
                navigate(`/meal/${meal.idMeal}`)
            }
        } catch (err) {
            setError('Failed to fetch random meal. Please try again.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleMealClick = (mealId) => {
        navigate(`/meal/${mealId}`)
    }

    const handleCategoryClick = async (categoryName) => {
        setLoading(true)
        setError(null)
        setShowResults(true)
        setSearchTerm(categoryName)

        try {
            const response = await axios.get(`/api/categories/${categoryName}`)
            if (response.data.ok) {
                setMeals(response.data.data || [])
            }
        } catch (err) {
            setError('Failed to fetch meals. Please try again.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">🍽️ Discover Delicious Meals</h1>
                    <p className="hero-subtitle">
                        Explore thousands of recipes from around the world
                    </p>
                </div>

                {/* Search Bar */}
                <div className="search-container">
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search for meals, ingredients, or cuisines..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="btn-primary search-btn">
                            🔍 Search
                        </button>
                    </form>
                    <button onClick={handleRandomMeal} className="btn-secondary random-btn" disabled={loading}>
                        🎲 Surprise Me!
                    </button>
                </div>
            </div>

            {/* Quick Category Access */}
            {!showResults && categories.length > 0 && (
                <div className="quick-categories">
                    <h2 className="section-title">Browse by Category</h2>
                    <div className="category-chips">
                        {categories.map((category) => (
                            <button
                                key={category.idCategory}
                                className="category-chip"
                                onClick={() => handleCategoryClick(category.strCategory)}
                            >
                                <img
                                    src={category.strCategoryThumb}
                                    alt={category.strCategory}
                                    className="category-chip-img"
                                />
                                <span>{category.strCategory}</span>
                            </button>
                        ))}
                    </div>
                    <button
                        className="view-all-btn"
                        onClick={() => navigate('/categories')}
                    >
                        View All Categories →
                    </button>
                </div>
            )}

            {/* Featured Info Cards */}
            {!showResults && (
                <div className="info-cards">
                    <div className="info-card">
                        <div className="info-icon">🌍</div>
                        <h3>Global Cuisine</h3>
                        <p>Recipes from every corner of the world</p>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">📖</div>
                        <h3>Easy Instructions</h3>
                        <p>Step-by-step cooking guides</p>
                    </div>
                    <div className="info-card">
                        <div className="info-icon">🎥</div>
                        <h3>Video Tutorials</h3>
                        <p>Watch and learn from experts</p>
                    </div>
                </div>
            )}

            {/* Loading, Error, and Results */}
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}

            {!loading && showResults && meals && meals.length > 0 && (
                <div className="results-section">
                    <div className="results-header">
                        <h2 className="section-title">
                            {searchTerm ? `Results for "${searchTerm}"` : 'Search Results'}
                        </h2>
                        <button
                            className="btn-secondary clear-btn"
                            onClick={() => {
                                setShowResults(false)
                                setMeals([])
                                setSearchTerm('')
                            }}
                        >
                            ← Back to Home
                        </button>
                    </div>
                    <div className="cards-grid">
                        {meals.map((meal) => (
                            <div
                                key={meal.idMeal}
                                className="card"
                                onClick={() => handleMealClick(meal.idMeal)}
                            >
                                <img src={meal.strMealThumb} alt={meal.strMeal} />
                                <div className="card-content">
                                    <h3>{meal.strMeal}</h3>
                                    {meal.strCategory && (
                                        <span className="category-badge">{meal.strCategory}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!loading && showResults && meals && meals.length === 0 && (
                <div className="no-results">
                    <div className="no-results-icon">🔍</div>
                    <h3>No meals found for "{searchTerm}"</h3>
                    <p>Try searching for something else or browse our categories</p>
                    <button
                        className="btn-primary"
                        onClick={() => {
                            setShowResults(false)
                            setSearchTerm('')
                        }}
                    >
                        Start Over
                    </button>
                </div>
            )}
        </div>
    )
}

export default Home
