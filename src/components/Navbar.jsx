import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  FaUserCircle,
  FaTachometerAlt,
  FaHeart,
  FaWallet,
  FaHome,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

import {
  getWalletBalance,
} from "../firebase/wallet";

import "../styles/navbar.css";

function Navbar() {

  const { user, signOut } =
    useAuth();

  const [balance, setBalance] =
    useState(0);

  const [openMenu, setOpenMenu] =
    useState(false);

  const handleSignOut =
    async () => {

      try {

        await signOut();

      } catch (error) {

        console.error(
          "Sign out failed:",
          error
        );
      }
    };

  useEffect(() => {

    const fetchBalance =
      async () => {

        if (!user) return;

        const walletBalance =
          await getWalletBalance(
            user.uid
          );

        setBalance(walletBalance);
      };

    fetchBalance();

  }, [user]);

  return (
    <nav className="navbar">

      <Link
        to="/dashboard"
        className="nav-logo"
      >
        CryptoTracker
      </Link>

      <div className="nav-right">

        <div className="profile-menu">

          <button
            className="profile-btn"
            onClick={() =>
              setOpenMenu(!openMenu)
            }
          >

            <FaUserCircle
              className="profile-icon"
            />

            <span className="nav-user">
              {user?.email}
            </span>

            <FaChevronDown
              className={
                openMenu
                  ? "arrow rotate"
                  : "arrow"
              }
            />

          </button>
          <div className="wallet-balance">
            $
            {balance.toLocaleString()}
          </div>

          {openMenu && (

            <div className="dropdown-menu">

              <Link
                to="/dashboard"
                className="dropdown-item"
              >
                <FaTachometerAlt />
                Dashboard
              </Link>

              <Link
                to="/watchlist"
                className="dropdown-item"
              >
                <FaHeart />
                Watchlist
              </Link>

              <Link
                to="/portfolio"
                className="dropdown-item"
              >
                <FaWallet />
                Portfolio
              </Link>

              <Link
                to="/"
                className="dropdown-item"
              >
                <FaHome />
                Home
              </Link>

              <button
                type="button"
                className="dropdown-item logout-item"
                onClick={handleSignOut}
              >
                <FaSignOutAlt />
                Sign out
              </button>

            </div>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;