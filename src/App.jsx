import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CoinDetails from "./pages/CoinDetails";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
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