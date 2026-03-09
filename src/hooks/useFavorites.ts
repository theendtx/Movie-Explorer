import  { useState } from "react"
import type { Movie } from "../types/movie"

export function useFavorites() {

  const [favorites, setFavorites] = useState<Movie[]>([])

    function toggleFavorite(movie: Movie) {

        const isFavorite = favorites.some(fav => fav.id === movie.id)

        if (isFavorite) {
            setFavorites(favorites.filter(fav => fav.id !== movie.id))
        } else {
            setFavorites([...favorites, movie])
        }
    }

    return { favorites, toggleFavorite }
}