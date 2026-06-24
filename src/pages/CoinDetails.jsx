import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { motion } from "framer-motion";

import {
  getCoinDetails,
  getCoinHistory,
} from "../services/cryptoApi";

import Navbar from "../components/Navbar";
import PriceChart from "../components/PriceChart";

import "../styles/coindetails.css";

function CoinDetails() {
  const { id } = useParams();

  const [coin, setCoin] = useState(null);
  const [history, setHistory] = useState([]);
  const [days, setDays] = useState(7);
  const [chartRange, setChartRange] = useState(null);
  const [chartMode, setChartMode] = useState("area");
  const [drawMode, setDrawMode] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const annotationDraftRef = useRef(null);

  useEffect(() => {
    const fetchCoin = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getCoinDetails(id);
        setCoin(data);
      } catch (err) {
        setCoin(null);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getCoinHistory(id, days);
        const chartData = data.prices.map((item) => ({
          date: new Date(item[0]).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          volume:
            data.total_volumes?.find((volumeItem) => volumeItem[0] === item[0])?.[1] ?? 0,
          price: item[1],
        }));

        setHistory(chartData);
        setChartRange(null);
        setAnnotations([]);
        annotationDraftRef.current = null;
      } catch (err) {
        setHistory([]);
        setError((prev) => prev ?? err.message);
      }
    };

    if (id) fetchHistory();
  }, [id, days]);

  const handleChartPoint = (point) => {
    if (!drawMode || !point) return;

    if (!annotationDraftRef.current) {
      annotationDraftRef.current = point;
      return;
    }

    const start = annotationDraftRef.current;
    const end = point;

    setAnnotations((current) => [
      ...current,
      {
        id: `${start.index}-${end.index}-${Date.now()}`,
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y,
        label: start.price <= end.price ? "Trend up" : "Trend down",
      },
    ]);

    annotationDraftRef.current = null;
    setDrawMode(false);
  };

  const clearAnnotations = () => {
    setAnnotations([]);
    annotationDraftRef.current = null;
    setDrawMode(false);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <p className="status-message coin-status">Loading coin data...</p>
      </>
    );
  }

  if (error || !coin) {
    return (
      <>
        <Navbar />
        <div className="coin-status">
          <p className="status-message status-error">
            {error ?? "Coin not found."}
          </p>
          <Link to="/dashboard" className="back-link">
            Back to dashboard
          </Link>
        </div>
      </>
    );
  }

  const description = coin.description?.en ?? "";
  const currentPrice = coin.market_data.current_price.usd;
  const high24 = coin.market_data.high_24h.usd;
  const low24 = coin.market_data.low_24h.usd;
  const change24 = coin.market_data.price_change_percentage_24h;
  const markers = [
    { label: "24H High", value: high24, color: "#22c55e" },
    { label: "24H Low", value: low24, color: "#f97316" },
    { label: "Current", value: currentPrice, color: "#60a5fa" },
  ];

  return (
    <>
      <Navbar />

      <motion.div
        className="coin-details"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="coin-header">
          <img src={coin.image.large} alt={coin.name} />

          <h1>{coin.name}</h1>

          <h3>{coin.symbol.toUpperCase()}</h3>

          <p>
            Price: $
            {currentPrice.toLocaleString()}
          </p>
        </div>

        <div className="coin-chart-toolbar">
          <div className="chart-toolbar-group">
            <button
              className={chartMode === "area" ? "chart-pill active" : "chart-pill"}
              onClick={() => setChartMode("area")}
              type="button"
            >
              Area
            </button>
            <button
              className={chartMode === "line" ? "chart-pill active" : "chart-pill"}
              onClick={() => setChartMode("line")}
              type="button"
            >
              Line
            </button>
            <button
              className={drawMode ? "chart-pill active" : "chart-pill"}
              onClick={() => setDrawMode((value) => !value)}
              type="button"
            >
              Draw line
            </button>
            <button className="chart-pill" onClick={clearAnnotations} type="button">
              Clear drawings
            </button>
          </div>

          <div className="chart-toolbar-group">
            <button className={days === 1 ? "chart-pill active" : "chart-pill"} onClick={() => setDays(1)} type="button">1D</button>
            <button className={days === 7 ? "chart-pill active" : "chart-pill"} onClick={() => setDays(7)} type="button">7D</button>
            <button className={days === 30 ? "chart-pill active" : "chart-pill"} onClick={() => setDays(30)} type="button">30D</button>
            <button className={days === 90 ? "chart-pill active" : "chart-pill"} onClick={() => setDays(90)} type="button">90D</button>
            <button className={days === 365 ? "chart-pill active" : "chart-pill"} onClick={() => setDays(365)} type="button">1Y</button>
          </div>
        </div>

        <div className="coin-stats">
          <div className="stat-box stat-box--rank">
            <h4>Rank</h4>
            <p>#{coin.market_cap_rank}</p>
          </div>

          <div className="stat-box stat-box--accent">
            <h4>Market Cap</h4>
            <p>
              $
              {coin.market_data.market_cap.usd.toLocaleString()}
            </p>
          </div>

          <div className="stat-box stat-box--positive">
            <h4>24H High</h4>
            <p>
              $
              {coin.market_data.high_24h.usd.toLocaleString()}
            </p>
          </div>

          <div className="stat-box stat-box--warning">
            <h4>24H Low</h4>
            <p>
              $
              {coin.market_data.low_24h.usd.toLocaleString()}
            </p>
          </div>

          <div className="stat-box stat-box--change">
            <h4>24H Change</h4>
            <p className={change24 >= 0 ? "positive" : "negative"}>
              {change24.toFixed(2)}%
            </p>
          </div>

          <div className="stat-box stat-box--soft">
            <h4>Circulating Supply</h4>
            <p>
              {coin.market_data.circulating_supply.toLocaleString()}
            </p>
          </div>

          <div className="stat-box stat-box--volume">
            <h4>Volume</h4>
            <p>
              $
              {coin.market_data.total_volume.usd.toLocaleString()}
            </p>
          </div>

          <div className="stat-box stat-box--ath">
            <h4>ATH</h4>
            <p>${coin.market_data.ath.usd.toLocaleString()}</p>
          </div>
        </div>

        <PriceChart
          data={history}
          markers={markers}
          activeRange={chartRange}
          onRangeChange={setChartRange}
          mode={chartMode}
          drawMode={drawMode}
          annotations={annotations}
          onPointSelect={handleChartPoint}
        />

        {drawMode && (
          <p className="status-message coin-draw-help">
            Draw mode is on. Click two points on the chart to place a trend line.
          </p>
        )}

        {description && (
          <div className="coin-description">
            <h2>About {coin.name}</h2>

            <p
              dangerouslySetInnerHTML={{
                __html: description.slice(0, 700) + "...",
              }}
            />
          </div>
        )}
      </motion.div>
    </>
  );
}

export default CoinDetails;
