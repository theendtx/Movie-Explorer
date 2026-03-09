import type { Movie } from "../types/movie"

type MovieCardProps = {
  movie: Movie
  favorites: Movie[]
  onToggleFavorite: (movie: Movie) => void
}

function MovieCard({ movie, favorites, onToggleFavorite }: MovieCardProps) {

  const isFavorite = favorites.some(fav => fav.id === movie.id)

  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />

      <h3>{movie.title}</h3>
      <p>{movie.year}</p>

      <button onClick={() => onToggleFavorite(movie)}>
        {isFavorite ? "❤️" : "🤍"}
      </button>

    </div>
  )
}

export default MovieCard