type HeaderProps = {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

function Header({ darkMode, setDarkMode }: HeaderProps) {
  return (
    <header className="hero">
      <div>
        <p className="hero-kicker">Stream and discover</p>
        <h1>Movie Explorer</h1>
      </div>

      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle theme"
      >
        {darkMode ? "Light mode" : "Dark mode"}
      </button>
    </header>
  )
}

export default Header
