import "../styles/topmovers.css";

function TopMovers({ coins }) {
  const gainers = [...coins]
    .filter((c) => c.price_change_percentage_24h != null)
    .sort(
      (a, b) =>
        b.price_change_percentage_24h -
        a.price_change_percentage_24h
    )
    .slice(0, 5);

  const losers = [...coins]
    .filter((c) => c.price_change_percentage_24h != null)
    .sort(
      (a, b) =>
        a.price_change_percentage_24h -
        b.price_change_percentage_24h
    )
    .slice(0, 5);

  return (
    <div className="movers-grid">

      {/* GAINERS */}
      <div className="mover-card">
        <h3>🚀 Top Gainers</h3>

        {gainers.map((coin) => (
          <div key={coin.id} className="mover-item">

            <div className="mover-coin-info">
              <img
                src={coin.image}
                alt={coin.name}
                className="mover-coin-img"
              />
              <div className="mover-coin-text">
                <span className="mover-coin-symbol">
                  {coin.symbol.toUpperCase()}
                </span>
                <span className="mover-coin-name">
                  {coin.name}
                </span>
              </div>
            </div>

            <span className="positive mover-pct">
              +{coin.price_change_percentage_24h.toFixed(2)}%
            </span>

          </div>
        ))}
      </div>

      {/* LOSERS */}
      <div className="mover-card">
        <h3>📉 Top Losers</h3>

        {losers.map((coin) => (
          <div key={coin.id} className="mover-item">

            <div className="mover-coin-info">
              <img
                src={coin.image}
                alt={coin.name}
                className="mover-coin-img"
              />
              <div className="mover-coin-text">
                <span className="mover-coin-symbol">
                  {coin.symbol.toUpperCase()}
                </span>
                <span className="mover-coin-name">
                  {coin.name}
                </span>
              </div>
            </div>

            <span className="negative mover-pct">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </span>

          </div>
        ))}
      </div>

    </div>
  );
}

export default TopMovers;