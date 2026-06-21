import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import CoinList from "../components/CoinList";

import { useWatchlist } from "../context/WatchlistContext";
import { getCoinsByIds } from "../services/cryptoApi";

import "../styles/watchlist.css";

function Watchlist() {
  const { watchlist } = useWatchlist();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!watchlist.length) {
      setCoins([]);
      setError(null);
      return;
    }

    const fetchPrices = async () => {
      setLoading(true);
      setError(null);

      try {
        const ids = watchlist.map((coin) => coin.id);
        const freshData = await getCoinsByIds(ids);

        const ordered = ids
          .map((id) => freshData.find((coin) => coin.id === id))
          .filter(Boolean);

        setCoins(ordered);
      } catch (err) {
        setError(err.message);
        setCoins(watchlist);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [watchlist]);

  return (
    <>
      <Navbar />

      <div className="watchlist-page">
        <div className="watchlist-header">
          <h1>Your Watchlist</h1>

          <p>
            Track your favorite cryptocurrencies in one place.
          </p>
        </div>

        {error && (
          <p className="status-message status-error">{error}</p>
        )}

        {loading && (
          <p className="status-message">Updating prices...</p>
        )}

        {watchlist.length === 0 ? (
          <div className="empty-watchlist">
            <h2>No coins added yet</h2>

            <p>Add coins from the dashboard ⭐</p>
          </div>
        ) : (
          <CoinList coins={coins} />
        )}
      </div>
    </>
  );
}

export default Watchlist;
