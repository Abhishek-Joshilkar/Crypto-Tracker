import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Link to="/" className="logo">
        CryptoTracker
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Market</Link>
        <Link to="/watchlist">Watchlist</Link>
      </div>
    </motion.nav>
  );
}

export default Navbar;