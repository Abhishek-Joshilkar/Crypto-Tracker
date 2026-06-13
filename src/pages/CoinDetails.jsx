import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCoinDetails } from "../services/cryptoApi";
import "../styles/coindetails.css";

function CoinDetails() {
  const { id } = useParams();

  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCoin();
  }, [id]);

  const fetchCoin = async () => {
    try {
      const data = await getCoinDetails(id);
      setCoin(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="coin-details">

      <img
        src={coin.image.large}
        alt={coin.name}
      />

      <h1>{coin.name}</h1>

      <h3>{coin.symbol.toUpperCase()}</h3>

      <p>
        Rank: #{coin.market_cap_rank}
      </p>

      <p>
        Price: $
        {coin.market_data.current_price.usd}
      </p>

      <p>
        Market Cap: $
        {coin.market_data.market_cap.usd}
      </p>

      <p>
        24h Change:
        {coin.market_data.price_change_percentage_24h}%
      </p>
    </div>
  );
}

export default CoinDetails;