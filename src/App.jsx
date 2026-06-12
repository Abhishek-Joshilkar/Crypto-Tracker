import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import CoinList from "./components/CoinList";

import { getCoins } from "../services/cryptoApi";

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    try {
      const data = await getCoins();
      setCoins(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <Hero />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {loading ? (
        <h2
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Loading...
        </h2>
      ) : (
        <CoinList coins={filteredCoins} />
      )}
    </>
  );
}

export default App;