import axios from "axios";

const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY?.trim();
const IS_PRO_PLAN =
  import.meta.env.VITE_COINGECKO_API_PLAN === "pro";

const BASE_URL = IS_PRO_PLAN
  ? "https://pro-api.coingecko.com/api/v3"
  : "https://api.coingecko.com/api/v3";

const api = axios.create({
  baseURL: BASE_URL,
  headers: API_KEY
    ? {
        [IS_PRO_PLAN
          ? "x-cg-pro-api-key"
          : "x-cg-demo-api-key"]: API_KEY,
      }
    : {},
});

const handleApiError = (label, error) => {
  const status = error.response?.status;

  if (status === 429) {
    throw new Error(
      API_KEY
        ? "CoinGecko rate limit reached. Wait a minute and try again."
        : "CoinGecko rate limit reached. Add VITE_COINGECKO_API_KEY to your .env file for higher limits."
    );
  }

  if (status === 401) {
    throw new Error(
      "Invalid CoinGecko API key. Check VITE_COINGECKO_API_KEY in your .env file."
    );
  }

  console.error(`${label}:`, error);
  throw new Error(`Failed to load ${label.toLowerCase()}.`);
};

export const getCoins = async () => {
  try {
    const response = await api.get("/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    });

    return response.data;
  } catch (error) {
    handleApiError("Coins", error);
  }
};

export const getCoinsByIds = async (ids) => {
  if (!ids.length) return [];

  try {
    const response = await api.get("/coins/markets", {
      params: {
        vs_currency: "usd",
        ids: ids.join(","),
        sparkline: false,
      },
    });

    return response.data;
  } catch (error) {
    handleApiError("Watchlist coins", error);
  }
};

export const searchCoins = async (query) => {
  try {
    const response = await api.get("/search", {
      params: { query },
    });

    const ids = response.data.coins
      .slice(0, 20)
      .map((coin) => coin.id);

    if (!ids.length) return [];

    return getCoinsByIds(ids);
  } catch (error) {
    handleApiError("Search", error);
  }
};

export const getGlobalStats = async () => {
  try {
    const response = await api.get("/global");
    return response.data.data;
  } catch (error) {
    handleApiError("Global stats", error);
  }
};

export const getCoinDetails = async (id) => {
  try {
    const response = await api.get(`/coins/${id}`);
    return response.data;
  } catch (error) {
    handleApiError("Coin details", error);
  }
};

export const getCoinHistory = async (id, days = 7) => {
  try {
    const response = await api.get(
      `/coins/${id}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days,
        },
      }
    );

    return response.data;
  } catch (error) {
    handleApiError("Chart data", error);
  }
};
