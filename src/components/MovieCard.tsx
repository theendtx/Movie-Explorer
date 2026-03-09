import type { Movie } from "../types/movie"
import React from "react"

type MovieCardProps = {
  movie: Movie
  favorites: Movie[]
  onToggleFavorite: (movie: Movie) => void
}

function MovieCard({ movie, favorites, onToggleFavorite }: MovieCardProps) {
  const isFavorite = favorites.some(fav => fav.id === movie.id)

  return (
    <article className="movie-card">
      <button
        className="favorite-btn"
        onClick={() => onToggleFavorite(movie)}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {isFavorite ? "*" : "+"}
      </button>

      <img src={movie.poster} alt={movie.title} loading="lazy" />

      <div className="movie-meta">
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
      </div>
    </article>
  )
}

export default React.memo(MovieCard)
