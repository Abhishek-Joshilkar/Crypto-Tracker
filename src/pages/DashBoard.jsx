import { useCallback, useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import SearchBar from "../components/SearchBar";
import CoinList from "../components/CoinList";
import MarketStats from "../components/MarketStats";
import TopMovers from "../components/TopMovers";

import {
  getCoins,
  getGlobalStats,
  searchCoins,
} from "../services/cryptoApi";

import "../styles/dashboard.css";

const REFRESH_INTERVAL_MS = 60000;

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [stats, setStats] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setError(null);

    try {
      const [coinData, statsData] = await Promise.all([
        getCoins(),
        getGlobalStats(),
      ]);

      setCoins(coinData);
      setStats(statsData);
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

  const displayCoins = search.trim()
    ? searchResults ?? []
    : filteredCoins;

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Crypto Market Dashboard</h1>

          <p>
            Track live cryptocurrency prices, market trends and
            analytics in real time.
          </p>

          <button
            type="button"
            className="refresh-btn"
            onClick={fetchData}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh prices"}
          </button>
        </div>

        {error && (
          <p className="status-message status-error">{error}</p>
        )}

        <SearchBar search={search} setSearch={setSearch} />

        {searching && (
          <p className="status-message">Searching coins...</p>
        )}

        {loading && !coins.length ? (
          <p className="status-message">Loading market data...</p>
        ) : (
          <>
            <MarketStats stats={stats} />

            {!search.trim() && (
              <TopMovers coins={displayCoins} />
            )}

            {search.trim() &&
            !searching &&
            displayCoins.length === 0 ? (
              <p className="status-message">
                No coins found for &quot;{search}&quot;.
              </p>
            ) : (
              <CoinList coins={displayCoins} />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
