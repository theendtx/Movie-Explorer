import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import MovieGrid from "./components/MovieGrid"

import { useMovies } from "./hooks/useMovies"
import { useFavorites } from "./hooks/useFavorites"

import { useState } from "react"

function App() {

  const { movies, loading, error } = useMovies()
  const { favorites, toggleFavorite } = useFavorites()

  const [searchQuery, setSearchQuery] = useState("")

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div>

      <Header />

      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <MovieGrid
        movies={filteredMovies}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />

    </div>
  )
}

export default App