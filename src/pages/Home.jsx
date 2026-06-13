import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar";
import CoinList from "../components/CoinList";
import MarketStats from "../components/MarketStats";

import {
  getCoins,
  getGlobalStats,
} from "../services/cryptoApi";

function Home() {
  const [coins, setCoins] = useState([]);
  const [stats, setStats] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coinData, statsData] =
        await Promise.all([
          getCoins(),
          getGlobalStats(),
        ]);

      setCoins(coinData);
      setStats(statsData);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <MarketStats stats={stats} />

      <CoinList coins={filteredCoins} />
    </>
  );
}

export default Home;