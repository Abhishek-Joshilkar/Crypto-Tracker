import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/DashBoard";
import CoinDetails from "./pages/CoinDetails";
import Watchlist from "./pages/Watchlist";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/watchlist"
        element={<Watchlist />}
      />
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/coin/:id"
        element={<CoinDetails />}
      />
    </Routes>

  );
}

export default App;