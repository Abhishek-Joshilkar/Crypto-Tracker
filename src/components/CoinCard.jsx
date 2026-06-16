import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  useWatchlist,
} from "../context/WatchlistContext";

import "../styles/coincard.css";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  show: {
    opacity: 1,
    y: 0,
  },
};

function CoinCard({ coin }) {
  const {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
  } = useWatchlist();

  const isSaved =
    watchlist.find(
      (item) => item.id === coin.id
    );

  return (
    <motion.div
      className="coin-card"
      variants={cardVariants}
      whileHover={{
        scale: 1.03,
        y: -5,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      <button
        className="watch-btn"
        onClick={() =>
          isSaved
            ? removeFromWatchlist(
                coin.id
              )
            : addToWatchlist(coin)
        }
      >
        {isSaved ? "★" : "☆"}
      </button>

      <Link to={`/coin/${coin.id}`}>
        <img
          src={coin.image}
          alt={coin.name}
        />

        <h4>{coin.name}</h4>

        <span className="coin-symbol">
          {coin.symbol.toUpperCase()}
        </span>

        <p>
          $
          {coin.current_price.toLocaleString()}
        </p>
      </Link>
    </motion.div>
  );
}

export default CoinCard;