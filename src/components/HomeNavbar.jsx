import { Link } from "react-router-dom";
import "../styles/homenavbar.css";

function HomeNavbar() {
  return (
    <nav className="home-navbar">
      <div className="logo">
        CryptoTracker
      </div>

      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#about">About</a>

        <Link to="/dashboard">
          Market
        </Link>

        <button className="nav-btn">
          Register
        </button>
      </div>
    </nav>
  );
}

export default HomeNavbar;