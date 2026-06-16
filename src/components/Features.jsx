import "../styles/features.css";

function Features() {
  return (
    <section
      id="features"
      className="features"
    >
      <h2>Powerful Features</h2>

      <div className="feature-grid">

        <div className="feature-card">
          📈
          <h3>Live Market Data</h3>
          <p>
            Real-time crypto updates.
          </p>
        </div>

        <div className="feature-card">
          📊
          <h3>Historical Charts</h3>
          <p>
            Analyze price movements.
          </p>
        </div>

        <div className="feature-card">
          ⭐
          <h3>Watchlist</h3>
          <p>
            Save favorite coins.
          </p>
        </div>

        <div className="feature-card">
          🚀
          <h3>Analytics</h3>
          <p>
            Track trends and performance.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Features;