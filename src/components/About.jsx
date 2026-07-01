import {
  FaChartLine,
  FaShieldAlt,
  FaCoins,
  FaBolt,
} from "react-icons/fa";

import "../styles/about.css";

function About() {
  return (
    <section
      id="about"
      className="about"
    >
      <div className="about-container">

        {/* LEFT CONTENT */}

        <div className="about-content">

          <p className="about-tag">
            ABOUT PLATFORM
          </p>

          <h2>
            The Smart Way to Track
            Cryptocurrency Markets
          </h2>

          <p className="about-description">
            CryptoTracker helps investors,
            traders and crypto enthusiasts
            monitor the market with real-time
            prices, analytics and portfolio
            insights in one modern dashboard.
          </p>

          <p className="about-description">
            Stay updated with trending coins,
            market movers, watchlists and
            performance tracking powered by
            live crypto data.
          </p>

          <div className="about-stats">

            <div className="stat-box">
              <h3>500+</h3>
              <span>Coins Tracked</span>
            </div>

            <div className="stat-box">
              <h3>24/7</h3>
              <span>Live Updates</span>
            </div>

            <div className="stat-box">
              <h3>99%</h3>
              <span>Realtime Accuracy</span>
            </div>

          </div>
        </div>

        {/* RIGHT FEATURES */}

        <div className="about-features">

          <div className="feature-card">
            <FaChartLine className="feature-icon" />

            <h3>
              Live Analytics
            </h3>

            <p>
              Monitor market trends and
              real-time price movements
              instantly.
            </p>
          </div>

          <div className="feature-card">
            <FaCoins className="feature-icon" />

            <h3>
              Portfolio Tracking
            </h3>

            <p>
              Manage your investments and
              track performance with ease.
            </p>
          </div>

          <div className="feature-card">
            <FaShieldAlt className="feature-icon" />

            <h3>
              Secure Experience
            </h3>

            <p>
              Reliable architecture and secure
              authentication for users.
            </p>
          </div>

          <div className="feature-card">
            <FaBolt className="feature-icon" />

            <h3>
              Fast Performance
            </h3>

            <p>
              Optimized dashboard with smooth
              realtime updates and navigation.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;