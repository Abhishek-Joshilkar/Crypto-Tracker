import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getCoinDetails,
  getCoinHistory,
} from "../services/cryptoApi";

import PriceChart from "../components/PriceChart";

import "../styles/coindetails.css";

function CoinDetails() {
  const { id } = useParams();

  const [coin, setCoin] = useState(null);
  const [history, setHistory] = useState([]);
  const [days, setDays] = useState(7);

  useEffect(() => {
    fetchCoin();
    fetchHistory();
  }, [id, days]);

  const fetchCoin = async () => {
    const data = await getCoinDetails(id);
    setCoin(data);
  };

  const fetchHistory = async () => {
    const data = await getCoinHistory(
      id,
      days
    );

    const chartData = data.prices.map(
      (item) => ({
        date: new Date(item[0]).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
          }
        ),
        price: item[1],
      })
    );

    setHistory(chartData);
  };

  if (!coin) {
    return <h2>Loading...</h2>;
  }

  return (
    <motion.div
      className="coin-details"
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
    >

      {/* Header */}

      <div className="coin-header">
        <img
          src={coin.image.large}
          alt={coin.name}
        />

        <h1>{coin.name}</h1>

        <h3>{coin.symbol.toUpperCase()}</h3>

        <p>
          Price: $
          {coin.market_data.current_price.usd.toLocaleString()}
        </p>
      </div>

      {/* Stats */}

      <div className="coin-stats">
        <div className="stat-box">
          <h4>Rank</h4>
          <p>#{coin.market_cap_rank}</p>
        </div>

        <div className="stat-box">
          <h4>Market Cap</h4>
          <p>
            ${coin.market_data.market_cap.usd.toLocaleString()}
          </p>
        </div>

        <div className="stat-box">
          <h4>24H High</h4>
          <p>
            ${coin.market_data.high_24h.usd.toLocaleString()}
          </p>
        </div>

        <div className="stat-box">
          <h4>24H Low</h4>
          <p>
            ${coin.market_data.low_24h.usd.toLocaleString()}
          </p>
        </div>

        <div className="stat-box">
          <h4>24H Change</h4>
          <p>
            {coin.market_data.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>

        <div className="stat-box">
          <h4>Circulating Supply</h4>
          <p>
            {coin.market_data.circulating_supply.toLocaleString()}
          </p>
        </div>

        <div className="stat-box">
          <h4>Volume</h4>
          <p>
            $
            {coin.market_data.total_volume.usd.toLocaleString()}
          </p>
        </div>

        <div className="stat-box">
          <h4>ATH</h4>
          <p>
            $
            {coin.market_data.ath.usd.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart Buttons */}

      <div className="chart-buttons">
        <button onClick={() => setDays(7)}>
          7D
        </button>

        <button onClick={() => setDays(30)}>
          30D
        </button>

        <button onClick={() => setDays(90)}>
          90D
        </button>
      </div>

      {/* Chart */}

      <PriceChart data={history} />

      {/* Description */}

      <div className="coin-description">
        <h2>About {coin.name}</h2>

        <p
          dangerouslySetInnerHTML={{
            __html:
              coin.description.en.slice(
                0,
                700
              ) + "...",
          }}
        />
      </div>

    </motion.div>
  );
}

export default CoinDetails;