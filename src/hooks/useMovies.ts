import { useEffect, useState } from "react"
import { recommendedMovieIds } from "../services/movies"
import type { Movie, MovieApi, MoviesApiResponse } from "../types/movie"

type MovieDetailsApi = {
  Title: string
  Year: string
  imdbID: string
  Poster: string
  Response?: string
}

function mapMovie(movie: MovieApi | MovieDetailsApi): Movie {
  return {
    id: movie.imdbID,
    title: movie.Title,
    year: Number(movie.Year),
    poster: movie.Poster,
  }
}

export function useMovies(): {
  movies: Movie[]
  loading: boolean
  error: string | null
  searchQuery: string
  isShowingRecommendations: boolean
  setSearchQuery: (value: string) => void
} {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 400)

    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      async function loadRecommendations() {
        try {
          setLoading(true)
          setError(null)

          const responses = await Promise.all(
            recommendedMovieIds.map(id =>
              fetch(`https://www.omdbapi.com/?i=${id}&apikey=ee34b827`).then(
                res => res.json() as Promise<MovieDetailsApi>
              )
            )
          )

          const validMovies = responses
            .filter(movie => movie.Response !== "False" && movie.Poster !== "N/A")
            .map(mapMovie)

          setMovies(validMovies)
        } catch {
          setError("Failed to load recommendations")
          setMovies([])
        } finally {
          setLoading(false)
        }
      }

      loadRecommendations()
      return
    }

    async function loadMovies() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(
          `https://www.omdbapi.com/?s=${debouncedQuery}&apikey=ee34b827`
        )

        const data: MoviesApiResponse = await res.json()

        if (!data.Search) {
          setMovies([])
          return
        }

        const mappedMovies = data.Search
          .filter(movie => movie.Poster !== "N/A")
          .map(mapMovie)

        setMovies(mappedMovies)
      } catch {
        setError("Failed to load movies")
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [debouncedQuery])

  return {
    movies,
    loading,
    error,
    searchQuery,
    isShowingRecommendations: !searchQuery.trim(),
    setSearchQuery,
  }
}
