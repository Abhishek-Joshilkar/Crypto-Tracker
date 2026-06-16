import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import SearchBar from "../components/SearchBar";
import CoinList from "../components/CoinList";
import MarketStats from "../components/MarketStats";
import TopMovers from "../components/TopMovers";

import {
  getCoins,
  getGlobalStats,
} from "../services/cryptoApi";

import "../styles/dashboard.css";

function Dashboard() {
  const [coins, setCoins] =
    useState([]);

  const [stats, setStats] =
    useState(null);

  const [search, setSearch] =
    useState("");

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

  const filteredCoins =
    coins.filter((coin) =>
      coin.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <div className="dashboard-header">
          <h1>
            Crypto Market Dashboard
          </h1>

          <p>
            Track live cryptocurrency
            prices, market trends and
            analytics in real time.
          </p>
        </div>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <MarketStats stats={stats} />

        <TopMovers
          coins={filteredCoins}
        />

        <CoinList
          coins={filteredCoins}
        />

      </div>
    </>
  );
}

export default Dashboard;