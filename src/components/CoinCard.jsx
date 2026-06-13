import { Link } from "react-router-dom";
import "../styles/coincard.css";

function CoinCard({ coin }) {
  return (
    <Link
      to={`/coin/${coin.id}`}
      className="coin-card"
    >
      <img src={coin.image} alt={coin.name} />

      <h3>{coin.name}</h3>

      <p>${coin.current_price}</p>
    </Link>
  );
}

export default CoinCard;