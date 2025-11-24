import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Categories from './pages/Categories'
import MealDetails from './pages/MealDetails'

function App() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/categories">Categories</Link></li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/meal/:id" element={<MealDetails />} />
            </Routes>
        </div>
    )
}

export default App
