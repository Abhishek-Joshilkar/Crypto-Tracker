import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "../styles/navbar.css";

function Navbar() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="nav-logo">
        CryptoTracker
      </Link>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/watchlist">Watchlist</Link>

        {user && (
          <span className="nav-user" title={user.email}>
            {user.email}
          </span>
        )}

        <button
          type="button"
          className="nav-logout-btn"
          onClick={handleSignOut}
        >
          Sign out
        </button>

        <Link to="/" className="nav-home-btn">
          Home
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
