import SearchBar from "../components/SearchBar"
import MovieGrid from "../components/MovieGrid"
import { useMovies } from "../hooks/useMovies"
import { useFavorites } from "../hooks/useFavorites"

function MoviesPage() {
  const { movies, loading, error, searchQuery, setSearchQuery } = useMovies()
  const { favorites, toggleFavorite } = useFavorites()

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <MovieGrid
        movies={movies}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    </>
  )
}

export default MoviesPage
