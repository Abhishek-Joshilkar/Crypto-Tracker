import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaDiscord,
} from "react-icons/fa";

import {
  Link,
} from "react-router-dom";

import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}

        <div className="footer-brand">

          <h2>
            CryptoTracker
          </h2>

          <p>
            Modern cryptocurrency dashboard
            for tracking live prices,
            analytics, watchlists and
            portfolio performance.
          </p>

          <div className="footer-socials">

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter />
            </a>

            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaDiscord />
            </a>

          </div>
        </div>

        {/* LINKS */}

        <div className="footer-links">

          <div className="footer-column">

            <h3>
              Navigation
            </h3>

            <Link to="/">
              Home
            </Link>

            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/watchlist">
              Watchlist
            </Link>

            <Link to="/portfolio">
              Portfolio
            </Link>

          </div>

          <div className="footer-column">

            <h3>
              Resources
            </h3>

            <a href="#">
              Market Data
            </a>

            <a href="#">
              Live Prices
            </a>

            <a href="#">
              Analytics
            </a>

            <a href="#">
              API Access
            </a>

          </div>

          <div className="footer-column">

            <h3>
              Company
            </h3>

            <a href="#">
              About
            </a>

            <a href="#">
              Privacy
            </a>

            <a href="#">
              Terms
            </a>

            <a href="#">
              Contact
            </a>

          </div>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="footer-bottom">

        <p>
          © 2026 CryptoTracker.
          All rights reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;