import "../styles/topmovers.css";

function TopMovers({ coins }) {
  const gainers = [...coins]
    .sort(
      (a, b) =>
        b.price_change_percentage_24h -
        a.price_change_percentage_24h
    )
    .slice(0, 5);

  const losers = [...coins]
    .sort(
      (a, b) =>
        a.price_change_percentage_24h -
        b.price_change_percentage_24h
    )
    .slice(0, 5);

  return (
    <section className="top-movers">

      <div className="mover-card">
        <h2>🚀 Top Gainers</h2>

        {gainers.map((coin) => (
          <div
            key={coin.id}
            className="mover-item"
          >
            <span>{coin.name}</span>

            <span className="positive">
              +{coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>

      <div className="mover-card">
        <h2>📉 Top Losers</h2>

        {losers.map((coin) => (
          <div
            key={coin.id}
            className="mover-item"
          >
            <span>{coin.name}</span>

            <span className="negative">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}

export default TopMovers;