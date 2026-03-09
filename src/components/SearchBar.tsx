type SearchBarProps = {
  searchQuery: string
  onSearchChange: (value: string) => void
}

function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar