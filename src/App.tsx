import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import MovieGrid from "./components/MovieGrid"
import { movies } from "./services/movies"

function App() {
  return (
    <div>
      <Header />
      <SearchBar />
      <MovieGrid movies={movies} />
    </div>
  )
}

export default App