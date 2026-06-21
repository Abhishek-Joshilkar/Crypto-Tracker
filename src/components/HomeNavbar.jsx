import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../styles/homenavbar.css";

function HomeNavbar() {
  const { user } = useAuth();

  return (
    <nav className="home-navbar">
      <div className="logo">CryptoTracker</div>

      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#about">About</a>

        {user ? (
          <Link to="/dashboard" className="nav-market-link">
            Dashboard
          </Link>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/dashboard" className="nav-market-link">
              Market
            </Link>
            <Link to="/signup" className="nav-btn nav-btn-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default HomeNavbar;
