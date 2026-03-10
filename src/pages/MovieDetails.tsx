import { useParams } from "react-router-dom"

function MovieDetails() {
  const { id } = useParams()

  return (
    <>
      <h1>Movie Details</h1>
      <p>Movie ID: {id}</p>
    </>
  )
}

export default MovieDetails
