import CoinCard from "./CoinCard";
import "../styles/coinlist.css";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

function CoinList({ coins }) {
  return (
    <motion.div
      className="coin-grid"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {coins.map((coin) => (
        <CoinCard
          key={coin.id}
          coin={coin}
        />
      ))}
    </motion.div>
  );
}

export default CoinList;