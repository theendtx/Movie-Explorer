export type Movie = {
  id: string
  title: string
  year: number
  poster: string
}

export type MovieApi = {
  Title: string
  Year: string
  imdbID: string
  Poster: string
}

export type MoviesApiResponse = {
  Search: MovieApi[]
}