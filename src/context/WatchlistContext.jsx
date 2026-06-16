import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WatchlistContext =
  createContext();

export function WatchlistProvider({
  children,
}) {
  const [watchlist, setWatchlist] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "watchlist"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  useEffect(() => {
    localStorage.setItem(
      "watchlist",
      JSON.stringify(watchlist)
    );
  }, [watchlist]);

  const addToWatchlist = (coin) => {
    const exists = watchlist.find(
      (item) => item.id === coin.id
    );

    if (!exists) {
      setWatchlist([
        ...watchlist,
        coin,
      ]);
    }
  };

  const removeFromWatchlist = (
    id
  ) => {
    setWatchlist(
      watchlist.filter(
        (coin) => coin.id !== id
      )
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