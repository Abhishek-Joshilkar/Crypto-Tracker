import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const WatchlistContext = createContext();

const getStorageKey = (userId) =>
  userId ? `watchlist_${userId}` : "watchlist_guest";

export function WatchlistProvider({ children }) {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(
      getStorageKey(userId)
    );

    setWatchlist(saved ? JSON.parse(saved) : []);
  }, [userId]);

  useEffect(() => {
    localStorage.setItem(
      getStorageKey(userId),
      JSON.stringify(watchlist)
    );
  }, [watchlist, userId]);

  const addToWatchlist = (coin) => {
    const exists = watchlist.find(
      (item) => item.id === coin.id
    );

    if (!exists) {
      setWatchlist([...watchlist, coin]);
    }
  };

  const removeFromWatchlist = (id) => {
    setWatchlist(
      watchlist.filter((coin) => coin.id !== id)
    );
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () =>
  useContext(WatchlistContext);
