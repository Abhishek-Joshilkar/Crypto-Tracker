import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  createWallet,
} from "../firebase/wallet";
import "../styles/auth.css";

function Login() {

  const { signIn } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const redirectTo =
    location.state?.from ||
    "/dashboard";

  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setError("");

      setLoading(true);

      try {

        const userCredential =
          await signIn(
            email,
            password
          );

        const user =
          userCredential.user;

        await createWallet(
          user.uid
        );

        navigate(
          redirectTo,
          {
            replace: true,
          }
        );

      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);

      }
    };

  return (
    <div className="auth-page">

      <div className="auth-orb auth-orb-one" />

      <div className="auth-orb auth-orb-two" />

      <div className="auth-card">

        <span className="auth-badge">
          Secure Access
        </span>

        <h1>
          Welcome back
        </h1>

        <p className="auth-subtitle">
          Sign in to access your
          crypto dashboard,
          watchlist and
          portfolio.
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <label>

            Email

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="you@example.com"
              required
            />

          </label>

          <label>

            Password

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="••••••••"
              required
            />

          </label>

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : "Sign In"}
          </button>

        </form>

        <p className="auth-footer">
          No account?{" "}

          <Link to="/signup">
            Create one
          </Link>

        </p>

        <Link
          to="/"
          className="auth-back"
        >
          ← Back to home
        </Link>

      </div>

    </div>
  );
}

export default Login;