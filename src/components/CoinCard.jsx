import "../styles/coincard.css";

function CoinCard({ coin }) {
  return (
    <div className="coin-card">
      <img src={coin.image} alt={coin.name} />

      <h3>{coin.name}</h3>

      <p>${coin.current_price}</p>
    </div>
  );
}

export default CoinCard;