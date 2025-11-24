import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Categories() {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await axios.get('/api/categories')
            if (response.data.ok) {
                setCategories(response.data.data || [])
            }
        } catch (err) {
            setError('Failed to fetch categories. Please try again.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const fetchMealsByCategory = async (categoryName) => {
        setSelectedCategory(categoryName)
        setLoading(true)
        setError(null)

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

    const handleMealClick = (mealId) => {
        navigate(`/meal/${mealId}`)
    }

    const handleBackToCategories = () => {
        setSelectedCategory(null)
        setMeals([])
    }

    return (
        <div className="container">
            <div className="page-header">
                <h1>📚 Meal Categories</h1>
                <p>Browse meals by category</p>
            </div>

            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}

            {!loading && !selectedCategory && (
                <div className="cards-grid">
                    {categories.map((category) => (
                        <div
                            key={category.idCategory}
                            className="card"
                            onClick={() => fetchMealsByCategory(category.strCategory)}
                        >
                            <img src={category.strCategoryThumb} alt={category.strCategory} />
                            <div className="card-content">
                                <h3>{category.strCategory}</h3>
                                <p>{category.strCategoryDescription?.substring(0, 100)}...</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && selectedCategory && (
                <>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <button onClick={handleBackToCategories} className="btn-secondary">
                            ← Back to Categories
                        </button>
                        <h2 style={{ color: '#3B82F6', marginTop: '1rem' }}>
                            {selectedCategory} Meals
                        </h2>
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
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Categories
