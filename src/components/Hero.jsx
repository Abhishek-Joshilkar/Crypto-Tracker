import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import heroImage from "../assets/hero.png";

import "../styles/hero.css";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-grid" />
      <div className="hero-vignette" />
      <div className="hero-streak hero-streak-one" />
      <div className="hero-streak hero-streak-two" />

      <motion.div
        className="hero-left"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="hero-badge">🚀 Track. Analyze. Grow.</div>

        <h1>
          Track Crypto.
          <br />
          Analyze Smarter.
          <br />
          <span>Invest Better.</span>
        </h1>

        <p>
          Get real-time market data, advanced analytics,
          and powerful tools to stay ahead in the crypto
          game.
        </p>

        <div className="hero-buttons">
          <Link to="/dashboard" className="hero-btn primary">
            Explore Dashboard
          </Link>
          <button className="hero-btn secondary" type="button">
            <span className="hero-play">▶</span>
            Watch Demo
          </button>
        </div>
      </motion.div>

      <motion.div
        className="hero-right"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
      >
        <div className="hero-illustration">
          <img
            src={heroImage}
            alt="Crypto illustration"
            className="hero-asset"
          />
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
