import { useEffect, useState } from "react"
import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import MovieGrid from "./components/MovieGrid"
import type { Movie, MovieApi, MoviesApiResponse } from "./types/movie"

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<Movie[]>([])
  const filteredMovies = movies.filter(movie =>
  movie.title.toLowerCase().includes(searchQuery.toLowerCase())
)

function toggleFavorite(movie: Movie) {

  const isFavorite = favorites.some(fav => fav.id === movie.id)

  if (isFavorite) {
    setFavorites(favorites.filter(fav => fav.id !== movie.id))
  } else {
    setFavorites([...favorites, movie])
  }

}

  useEffect(() => {
    fetch("https://www.omdbapi.com/?s=batman&apikey=564727fa")
      .then(res => res.json())
      .then((data: MoviesApiResponse) => {
        const mappedMovies = data.Search.map((movie: MovieApi) => ({
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
      <SearchBar
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
/>
      <MovieGrid
  movies={filteredMovies}
  favorites={favorites}
  onToggleFavorite={toggleFavorite}
/>
    </div>
  )
}