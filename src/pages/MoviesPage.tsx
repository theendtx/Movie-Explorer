import SearchBar from "../components/SearchBar"
import MovieGrid from "../components/MovieGrid"
import { useMovies } from "../hooks/useMovies"
import { useFavorites } from "../hooks/useFavorites"

function MoviesPage() {
  const {
    movies,
    loading,
    error,
    searchQuery,
    isShowingRecommendations,
    setSearchQuery,
    page,
    setPage
  } = useMovies()
  const { favorites, toggleFavorite } = useFavorites()
  

  return (
    <>
      <section className="spotlight">
        <p className="spotlight-kicker">
          {isShowingRecommendations ? "Tonight's lineup" : "Search mode"}
        </p>
        <h2>
          {isShowingRecommendations
            ? "Handpicked sci-fi, crime and action picks that actually deserve the first screen"
            : `Results for "${searchQuery}"`}
        </h2>
        <p className="spotlight-copy">
          {isShowingRecommendations
            ? "A curated wall of strong posters and proven titles so the home page never feels empty."
            : "Live search from OMDb with direct detail pages and favorites support."}
        </p>
      </section>

      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p className="empty-state">No movies found. Try another title.</p>
      )}

      <MovieGrid
        movies={movies}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />

      <div style={{ marginTop: "20px" }}>

  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    Prev
  </button>

  <span style={{ margin: "0 10px" }}>
    Page {page}
  </span>

  <button onClick={() => setPage(page + 1)}>
    Next
  </button>

</div>
    </>
    
  )
}

export default MoviesPage
