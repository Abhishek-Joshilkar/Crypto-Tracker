import "../styles/marketstats.css";

function MarketStats({ stats }) {
  if (!stats) return null;

  return (
    <section className="market-stats">

      <div className="stat-card">
        <h3>Market Cap</h3>
        <p>
          $
          {(
            stats.total_market_cap.usd / 1e12
          ).toFixed(2)}
          T
        </p>
      </div>

      <div className="stat-card">
        <h3>24h Volume</h3>
        <p>
          $
          {(
            stats.total_volume.usd / 1e9
          ).toFixed(2)}
          B
        </p>
      </div>

      <div className="stat-card">
        <h3>BTC Dominance</h3>
        <p>
          {stats.market_cap_percentage.btc.toFixed(2)}
          %
        </p>
      </div>

      <div className="stat-card">
        <h3>Active Coins</h3>
        <p>
          {stats.active_cryptocurrencies}
        </p>
      </div>

    </section>
  );
}

export default MarketStats;