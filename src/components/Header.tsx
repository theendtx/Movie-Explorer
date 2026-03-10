import { NavLink } from "react-router-dom"

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

            <nav className="top-nav">
        <NavLink to="/" end className="nav-link">
          Movies
        </NavLink>

        <NavLink to="/favorites" className="nav-link">
          Favorites
        </NavLink>
      </nav>


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
