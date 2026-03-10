import MovieGrid from "../components/MovieGrid"
import { useFavorites } from "../hooks/useFavorites"

function FavoritesPage() {

  const { favorites, toggleFavorite } = useFavorites()

  return (
    <>
      <h1>Favorites</h1>

      <MovieGrid
        movies={favorites}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    </>
  )
}

export default FavoritesPage