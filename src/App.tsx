import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"

import Header from "./components/Header"
import MoviesPage from "./pages/MoviesPage"
import FavoritesPage from "./pages/FavoritesPage"
import MovieDetails from "./pages/MovieDetails"
import "./App.css"
import "./index.css"

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.body.classList.toggle("theme-dark", darkMode)
    document.body.classList.toggle("theme-light", !darkMode)
  }, [darkMode])

  return (
    <div className={`app ${darkMode ? "theme-dark" : "theme-light"}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  )
}

export default App
