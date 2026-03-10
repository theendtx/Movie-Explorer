import { useEffect, useState } from "react"
import type { Movie, MovieApi, MoviesApiResponse } from "../types/movie"

export function useMovies(): {
  movies: Movie[]
  loading: boolean
  error: string | null
  searchQuery: string
  setSearchQuery: (value: string) => void
} {

  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMovies = movies.filter(movie =>
  movie.title.toLowerCase().includes(searchQuery.toLowerCase())
)

  useEffect(() => {
    async function loadMovies() {
      try {
        const res = await fetch(
  "https://www.omdbapi.com/?s=movie&apikey=ee34b827"
)
        const data: MoviesApiResponse = await res.json()

        const mappedMovies = data.Search.map((movie: MovieApi) => ({
          id: movie.imdbID,
          title: movie.Title,
          year: Number(movie.Year),
          poster: movie.Poster
        }))

        setMovies(mappedMovies)
      } catch {
        setError("Failed to load movies")
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [])

  return {
  movies: filteredMovies,
  loading,
  error,
  searchQuery,
  setSearchQuery
}

}
