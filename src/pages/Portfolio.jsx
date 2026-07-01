import {
  useEffect,
  useState,
} from "react";

import {
  getAuth,
} from "firebase/auth";

import Navbar from "../components/Navbar";

import {
  getPortfolioCoins,
} from "../firebase/firestore";

import "../styles/portfolio.css";

function Portfolio() {

  const [portfolio, setPortfolio] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const auth = getAuth();

  const user = auth.currentUser;

  useEffect(() => {

    if (user) {

      fetchPortfolio();

    }

  }, [user]);

  const fetchPortfolio =
    async () => {

      try {

        const data =
          await getPortfolioCoins(
            user.uid
          );

        setPortfolio(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  const totalInvestment =
    portfolio.reduce(
      (acc, coin) =>
        acc +
        coin.buyPrice *
        coin.quantity,
      0
    );

  const currentValue =
    portfolio.reduce(
      (acc, coin) =>
        acc +
        coin.current_price *
        coin.quantity,
      0
    );

  const profitLoss =
    currentValue -
    totalInvestment;

  return (
    <>
      <Navbar />

      <div className="portfolio-page">

        <div className="portfolio-header">

          <h1>
            My Portfolio
          </h1>

          <p>
            Track your crypto
            investments and
            performance.
          </p>

        </div>

        <div className="portfolio-balance-card">
          <h3>Total Portfolio Value</h3>

          <h1>
            ${currentValue.toLocaleString()}
          </h1>
        </div>

        {/* SUMMARY */}

        <div className="portfolio-summary">

          <div className="summary-box">

            <h3>
              Total Investment
            </h3>

            <p>
              $
              {totalInvestment.toLocaleString()}
            </p>

          </div>

          <div className="summary-box">

            <h3>
              Current Value
            </h3>

            <p>
              $
              {currentValue.toLocaleString()}
            </p>

          </div>

          <div className="summary-box">

            <h3>
              Profit / Loss
            </h3>

            <p
              className={
                profitLoss >= 0
                  ? "profit"
                  : "loss"
              }
            >
              $
              {profitLoss.toLocaleString()}
            </p>

          </div>

        </div>

        {/* COINS */}

        {loading ? (

          <p className="loading-text">
            Loading portfolio...
          </p>

        ) : portfolio.length === 0 ? (

          <div className="empty-portfolio">

            <h2>
              No Portfolio Coins
            </h2>

            <p>
              Add coins from dashboard.
            </p>

          </div>

        ) : (

          <div className="portfolio-grid">

            {portfolio.map(
              (coin) => (

                <div
                  key={coin.docId}
                  className="portfolio-card"
                >

                  <img
                    src={coin.image}
                    alt={coin.name}
                  />

                  <h2>
                    {coin.name}
                  </h2>

                  <p>
                    Quantity:
                    {" "}
                    {coin.quantity}
                  </p>

                  <p>
                    Buy Price:
                    {" "}
                    $
                    {coin.buyPrice}
                  </p>

                  <p>
                    Current:
                    {" "}
                    $
                    {coin.current_price}
                  </p>

                  <div
                    className={
                      coin.current_price >
                        coin.buyPrice
                        ? "profit"
                        : "loss"
                    }
                  >
                    {coin.current_price >
                      coin.buyPrice
                      ? "Profit"
                      : "Loss"}
                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>
    </>
  );
}

export default Portfolio;