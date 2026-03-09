import { useEffect, useState } from "react"
import type { Movie } from "../types/movie"

export function useFavorites(): {
  favorites: Movie[]
  toggleFavorite: (movie: Movie) => void
} {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    try {
      const stored = localStorage.getItem("favorites")
      return stored ? (JSON.parse(stored) as Movie[]) : []
    } catch {
      return []
    }
  })

  function toggleFavorite(movie: Movie) {
    const isFavorite = favorites.some(fav => fav.id === movie.id)

    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== movie.id))
    } else {
      setFavorites([...favorites, movie])
    }
  }

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  return { favorites, toggleFavorite }
}
