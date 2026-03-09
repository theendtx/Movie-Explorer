import type { Movie } from "../types/movie"
import MovieCard from "./MovieCard"

type MovieGridProps = {
  movies: Movie[]
  favorites: Movie[]
  onToggleFavorite: (movie: Movie) => void
}

function MovieGrid({ movies, favorites, onToggleFavorite }: MovieGridProps) {
  return (
    <div className="movie-grid">
      {movies.map(movie => (
  <MovieCard
    key={movie.id}
    movie={movie}
    favorites={favorites}
    onToggleFavorite={onToggleFavorite}
  />
))}
    </div>
  )
}

export default MovieGrid