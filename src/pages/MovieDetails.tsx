import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

type MovieDetailsData = {
  Title: string
  Year: string
  Plot: string
  Poster: string
  Genre: string
  Runtime: string
  imdbRating: string
  Response?: string
  Error?: string
}

function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState<MovieDetailsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setError("Movie id not found")
      setLoading(false)
      return
    }

    async function loadMovieDetails() {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=ee34b827`
        )
        const data: MovieDetailsData = await response.json()

        if (data.Response === "False") {
          setError(data.Error ?? "Movie not found")
          return
        }

        setMovie(data)
      } catch {
        setError("Failed to load movie details")
      } finally {
        setLoading(false)
      }
    }

    loadMovieDetails()
  }, [id])

  if (loading) return <p className="loading">Loading details...</p>
  if (error) return <p className="loading">{error}</p>
  if (!movie) return <p className="loading">Movie not found</p>

  return (
    <section className="details-page">
      <Link className="back-link" to="/">
        Back to Movies
      </Link>

      <div className="details-card">
        <img src={movie.Poster} alt={movie.Title} />

        <div>
          <h2>{movie.Title}</h2>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
          <p><strong>IMDb:</strong> {movie.imdbRating}</p>
          <p>{movie.Plot}</p>
        </div>
      </div>
    </section>
  )
}

export default MovieDetails
