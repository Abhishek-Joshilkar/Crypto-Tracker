import Navbar from "../components/Navbar";

import CoinList from "../components/CoinList";

import {
  useWatchlist,
} from "../context/WatchlistContext";

import "../styles/watchlist.css";

function Watchlist() {
  const { watchlist } =
    useWatchlist();

  return (
    <>
      <Navbar />

      <div className="watchlist-page">
        <div className="watchlist-header">
          <h1>Your Watchlist</h1>

          <p>
            Track your favorite
            cryptocurrencies in one
            place.
          </p>
        </div>

        {watchlist.length === 0 ? (
          <div className="empty-watchlist">
            <h2>
              No coins added yet
            </h2>

            <p>
              Add coins from the
              dashboard ⭐
            </p>
          </div>
        ) : (
          <CoinList
            coins={watchlist}
          />
        )}
      </div>
    </>
  );
}

export default Watchlist;