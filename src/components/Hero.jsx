import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import HomeNavbar from "./HomeNavbar";

import "../styles/hero.css";

function Hero() {
  return (
    <>
      <HomeNavbar />

      <section className="hero">

        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>

        <motion.div
          className="hero-content"
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
        >
          <motion.h1
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
          >
            Next Generation
            <span> Crypto Tracking</span>
          </motion.h1>

          <p>
            Monitor cryptocurrency prices,
            market trends, portfolio growth,
            and advanced analytics in real time.
          </p>

          <div className="hero-buttons">
            <Link
              to="/dashboard"
              className="hero-btn primary"
            >
              Explore Market
            </Link>

            <a
              href="#about"
              className="hero-btn secondary"
            >
              Learn More
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <h3>17K+</h3>
              <p>Coins</p>
            </div>

            <div>
              <h3>$2.2T</h3>
              <p>Market Cap</p>
            </div>

            <div>
              <h3>24/7</h3>
              <p>Live Updates</p>
            </div>
          </div>
        </motion.div>

      </section>
    </>
  );
}

export default Hero;