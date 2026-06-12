import CoinCard from "./CoinCard";
import "../styles/coinlist.css";

function CoinList({ coins }) {
  return (
    <div className="coin-grid">
      {coins.map((coin) => (
        <CoinCard
          key={coin.id}
          coin={coin}
        />
      ))}
    </div>
  );
}

export default CoinList;