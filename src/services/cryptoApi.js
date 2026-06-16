import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const getCoins = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/coins/markets`,
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 50,
          page: 1,
          sparkline: false,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Coins API Error:", error);
    return [];
  }
};

export const getGlobalStats = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/global`
    );

    return response.data.data;
  } catch (error) {
    console.error("Global Stats API Error:", error);
    return null;
  }
};

export const getCoinDetails = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/coins/${id}`
    );

    return response.data;
  } catch (error) {
    console.error("Coin Details API Error:", error);
    return null;
  }
};

export const getCoinHistory = async (
  id,
  days = 7
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/coins/${id}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Chart API Error:", error);
    return { prices: [] };
  }
};