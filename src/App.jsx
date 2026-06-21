import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/DashBoard";
import CoinDetails from "./pages/CoinDetails";
import Watchlist from "./pages/Watchlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import ProtectedRoute, {
  GuestRoute,
} from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <GuestRoute>
            <Signup />
          </GuestRoute>
        }
      />

      <Route
        path="/watchlist"
        element={
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/coin/:id"
        element={
          <ProtectedRoute>
            <CoinDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
