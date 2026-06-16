import { Link } from "react-router-dom";

import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link
        to="/dashboard"
        className="nav-logo"
      >
        CryptoTracker
      </Link>

      <div className="nav-links">
        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/watchlist">
          Watchlist
        </Link>

        <Link
          to="/"
          className="nav-home-btn"
        >
          Home
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;