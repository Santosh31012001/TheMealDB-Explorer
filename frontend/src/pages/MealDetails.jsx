import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function MealDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [meal, setMeal] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchMealDetails()
    }, [id])

    const fetchMealDetails = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await axios.get(`/api/meals/${id}`)
            if (response.data.ok) {
                setMeal(response.data.data)
            }
        } catch (err) {
            setError('Failed to fetch meal details. Please try again.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const getIngredients = () => {
        if (!meal) return []

        const ingredients = []
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`]
            const measure = meal[`strMeasure${i}`]

            if (ingredient && ingredient.trim()) {
                ingredients.push(`${measure} ${ingredient}`.trim())
            }
        }
        return ingredients
    }

    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null
        const videoId = url.split('v=')[1]
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null
    }

    if (loading) {
        return <div className="loading">Loading meal details...</div>
    }

    if (error) {
        return (
            <div className="container">
                <div className="error">{error}</div>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button onClick={() => navigate(-1)} className="btn-secondary">
                        Go Back
                    </button>
                </div>
            </div>
        )
    }

    if (!meal) {
        return (
            <div className="container">
                <div className="no-results">Meal not found</div>
            </div>
        )
    }

    const ingredients = getIngredients()
    const youtubeUrl = getYouTubeEmbedUrl(meal.strYoutube)

    return (
        <div className="container">
            <button onClick={() => navigate(-1)} className="btn-secondary" style={{ marginBottom: '2rem' }}>
                ← Back
            </button>

            <div className="meal-details">
                <div className="meal-header">
                    <img src={meal.strMealThumb} alt={meal.strMeal} />
                    <div className="meal-info">
                        <h2>{meal.strMeal}</h2>
                        <p><strong>Category:</strong> {meal.strCategory}</p>
                        <p><strong>Area:</strong> {meal.strArea}</p>
                        {meal.strTags && (
                            <p><strong>Tags:</strong> {meal.strTags}</p>
                        )}
                    </div>
                </div>

                <div>
                    <h3 style={{ marginBottom: '1rem', color: '#3B82F6' }}>📝 Ingredients</h3>
                    <ul className="ingredients-list">
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>

                <div className="instructions">
                    <h3 style={{ marginBottom: '1rem', color: '#3B82F6' }}>👨‍🍳 Instructions</h3>
                    <p>{meal.strInstructions}</p>
                </div>

                {youtubeUrl && (
                    <div className="video-container">
                        <h3 style={{ marginBottom: '1rem', color: '#3B82F6' }}>🎥 Video Tutorial</h3>
                        <iframe
                            src={youtubeUrl}
                            title={meal.strMeal}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default MealDetails
