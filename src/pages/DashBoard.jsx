import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import CoinList from "../components/CoinList";
import TopMovers from "../components/TopMovers";
import { useWatchlist } from "../context/WatchlistContext";

import {
  getCoins,
  getGlobalStats,
  searchCoins,
} from "../services/cryptoApi";

import "../styles/dashboard.css";

const REFRESH_INTERVAL_MS = 60000;
const MARKET_TABS = [
  { label: "All coins", key: "all" },
  { label: "Market cap", key: "market-cap" },
  { label: "Gainers", key: "gainers" },
  { label: "Losers", key: "losers" },
  { label: "Most traded", key: "volume" },
  { label: "Watchlist", key: "watchlist" },
];

const formatCurrency = (value) =>
  `$${Number(value ?? 0).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}`;

function Dashboard() {
  const { watchlist } = useWatchlist();
  const [coins, setCoins] = useState([]);
  const [stats, setStats] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [marketTab, setMarketTab] = useState("all");

  const fetchData = useCallback(async () => {
    setError(null);

    try {
      const [coinData, statsData] = await Promise.all([
        getCoins(),
        getGlobalStats(),
      ]);

      setCoins(coinData);
      setStats(statsData);
      setSelectedCoinId((current) => current ?? coinData[0]?.id ?? null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchData]);

  useEffect(() => {
    const query = search.trim();

    if (!query) {
      setSearchResults(null);
      setSearching(false);
      return;
    }

    setSearching(true);

    const timer = setTimeout(async () => {
      try {
        const results = await searchCoins(query);
        setSearchResults(results);
        setError(null);
      } catch (err) {
        setSearchResults([]);
        setError(err.message);
      } finally {
        setSearching(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const displayCoins = search.trim() ? searchResults ?? [] : filteredCoins;

  const marketCoins = useMemo(() => {
    const base =
      marketTab === "watchlist"
        ? coins.filter((coin) =>
            watchlist.some((item) => item.id === coin.id)
          )
        : [...coins];

    switch (marketTab) {
      case "market-cap":
        return base.sort(
          (a, b) => (b.market_cap ?? 0) - (a.market_cap ?? 0)
        );
      case "gainers":
        return base
          .sort(
            (a, b) =>
              (b.price_change_percentage_24h ?? 0) -
              (a.price_change_percentage_24h ?? 0)
          )
          .slice(0, 50);
      case "losers":
        return base
          .sort(
            (a, b) =>
              (a.price_change_percentage_24h ?? 0) -
              (b.price_change_percentage_24h ?? 0)
          )
          .slice(0, 50);
      case "volume":
        return base.sort(
          (a, b) => (b.total_volume ?? 0) - (a.total_volume ?? 0)
        );
      case "watchlist":
        return base;
      default:
        return base.sort(
          (a, b) => (a.market_cap_rank ?? 9999) - (b.market_cap_rank ?? 9999)
        );
    }
  }, [coins, marketTab, watchlist]);

  const selectedCoin = useMemo(
    () =>
      coins.find((coin) => coin.id === selectedCoinId) ??
      displayCoins.find((coin) => coin.id === selectedCoinId) ??
      displayCoins[0] ??
      coins[0] ??
      null,
    [coins, selectedCoinId, displayCoins]
  );

  const topCoins = useMemo(() => {
    const source = search.trim() ? displayCoins : marketCoins;
    return source.slice(0, 12);
  }, [displayCoins, marketCoins, search]);

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <section className="dashboard-hero">
          <div>
            <p className="dashboard-kicker">Live market workspace</p>
            <h1>Trading dashboard</h1>
            <p className="dashboard-subtitle">
              Track a selected coin, inspect its history, and keep the chart moving with real market data.
            </p>
          </div>

          <div className="dashboard-actions">
            <Link to="/watchlist" className="dashboard-link-btn">
              Watchlist {watchlist.length ? `(${watchlist.length})` : ""}
            </Link>
            <button type="button" className="refresh-btn" onClick={fetchData} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh data"}
            </button>
          </div>
        </section>

        {error && <p className="status-message status-error">{error}</p>}

        <section className="dashboard-panel market-tabs-panel">
          <div className="market-tabs">
            {MARKET_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={marketTab === tab.key ? "market-tab active" : "market-tab"}
                onClick={() => setMarketTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {!loading && selectedCoin && (
          <section className="dashboard-panel selected-coin-summary">
            <div className="selected-coin-title">
              <img src={selectedCoin.image} alt={selectedCoin.name} />
              <div>
                <h2>{selectedCoin.name}</h2>
                <p>{selectedCoin.symbol.toUpperCase()}</p>
              </div>
            </div>

            <div className="summary-grid">
              <article className="summary-card">
                <span>Current price</span>
                <strong>{formatCurrency(selectedCoin.current_price)}</strong>
              </article>
              <article className="summary-card">
                <span>24h change</span>
                <strong className={selectedCoin.price_change_percentage_24h >= 0 ? "positive" : "negative"}>
                  {Number(selectedCoin.price_change_percentage_24h ?? 0).toFixed(2)}%
                </strong>
              </article>
              <article className="summary-card">
                <span>24h high</span>
                <strong>{formatCurrency(selectedCoin.high_24h)}</strong>
              </article>
              <article className="summary-card">
                <span>24h low</span>
                <strong>{formatCurrency(selectedCoin.low_24h)}</strong>
              </article>
              <article className="summary-card">
                <span>Market cap</span>
                <strong>{formatCurrency(selectedCoin.market_cap)}</strong>
              </article>
              <article className="summary-card">
                <span>Volume</span>
                <strong>{formatCurrency(selectedCoin.total_volume)}</strong>
              </article>
            </div>
          </section>
        )}

        <section className="dashboard-panel market-list-panel">
          <div className="panel-heading">
            <div>
              <h2>Market ranking</h2>
              <p>
                Browse the market list and pick a coin to load its live chart.
              </p>
            </div>
            <span className="chart-status">
              {marketCoins.length} coins
            </span>
          </div>

          <div className="market-list">
            <div className="market-list-head">
              <span>#</span>
              <span>Coin</span>
              <span>Price</span>
              <span>24h</span>
              <span>Market cap</span>
              <span>Volume</span>
            </div>

            {marketCoins.slice(0, 20).map((coin) => (
              <button
                key={coin.id}
                type="button"
                className={
                  coin.id === selectedCoin?.id
                    ? "market-row active"
                    : "market-row"
                }
                onClick={() => setSelectedCoinId(coin.id)}
              >
                <span>{coin.market_cap_rank ?? "-"}</span>
                <span className="market-coin-name">
                  <img src={coin.image} alt={coin.name} />
                  <strong>
                    {coin.name}
                    <small>{coin.symbol.toUpperCase()}</small>
                  </strong>
                </span>
                <span>{formatCurrency(coin.current_price)}</span>
                <span
                  className={
                    (coin.price_change_percentage_24h ?? 0) >= 0
                      ? "positive"
                      : "negative"
                  }
                >
                  {Number(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
                </span>
                <span>{formatCurrency(coin.market_cap)}</span>
                <span>{formatCurrency(coin.total_volume)}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="dashboard-split">
          <div className="dashboard-panel">
            <div className="panel-heading">
              <div>
                <h2>Top movers</h2>
                <p>Fast view of market direction.</p>
              </div>
            </div>
            {loading && !coins.length ? (
              <p className="status-message">Loading movers...</p>
            ) : (
              <TopMovers coins={coins} />
            )}
          </div>

          <div className="dashboard-panel">
            <div className="panel-heading">
              <div>
                <h2>Market search</h2>
                <p>Search coins and open them in the market list.</p>
              </div>
            </div>

            <SearchBar search={search} setSearch={setSearch} />

            {searching && <p className="status-message">Searching coins...</p>}

            {loading && !coins.length ? (
              <p className="status-message">Loading market data...</p>
            ) : search.trim() && !searching && displayCoins.length === 0 ? (
              <p className="status-message">No coins found for &quot;{search}&quot;.</p>
            ) : (
              <div className="dashboard-coinlist">
                <CoinList coins={topCoins} />
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;
