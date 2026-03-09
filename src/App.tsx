import { useEffect, useState } from "react"
import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import MovieGrid from "./components/MovieGrid"
import { useMovies } from "./hooks/useMovies"
import { useFavorites } from "./hooks/useFavorites"
import "./App.css"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const { movies, loading, error } = useMovies()
  const { favorites, toggleFavorite } = useFavorites()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    document.body.classList.toggle("theme-dark", darkMode)
    document.body.classList.toggle("theme-light", !darkMode)
  }, [darkMode])

  if (loading) return <div className="loading">Loading movies...</div>
  if (error) return <p className="loading">{error}</p>

  return (
    <div className={`app ${darkMode ? "theme-dark" : "theme-light"}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <MovieGrid
        movies={filteredMovies}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  )
}

export default App
