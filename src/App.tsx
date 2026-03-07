import { useEffect, useState } from "react"
import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import MovieGrid from "./components/MovieGrid"
import type { Movie } from "./types/movie"

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("https://www.omdbapi.com/?s=batman&apikey=564727fa")
      .then(res => res.json())
      .then(data => {
        const mappedMovies = data.Search.map((movie: any) => ({
          id: movie.imdbID,
          title: movie.Title,
          year: Number(movie.Year),
          poster: movie.Poster
        }))

        setMovies(mappedMovies)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load movies")
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <Header />
      <SearchBar />
      <MovieGrid movies={movies} />
    </div>
  )
}