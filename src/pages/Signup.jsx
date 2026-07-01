import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  createWallet,
} from "../firebase/wallet";

import "../styles/auth.css";

function Signup() {

  const { signUp } = useAuth();

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setError("");

      setSuccess("");

      if (
        password !==
        confirmPassword
      ) {

        setError(
          "Passwords do not match"
        );

        return;
      }

      if (
        password.length < 6
      ) {

        setError(
          "Password must be at least 6 characters"
        );

        return;
      }

      setLoading(true);

      try {

        const userCredential =
          await signUp(
            email,
            password
          );

        const user =
          userCredential.user;

        await createWallet(
          user.uid
        );

        setSuccess(
          "Account created successfully"
        );

        navigate(
          "/dashboard",
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
          Create Vault
        </span>

        <h1>
          Join CryptoTracker
        </h1>

        <p className="auth-subtitle">
          Create your secure
          crypto trading account.
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
              placeholder="Minimum 6 characters"
              required
            />

          </label>

          <label>

            Confirm Password

            <input
              type="password"
              value={
                confirmPassword
              }
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="Repeat password"
              required
            />

          </label>

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          {success && (
            <p className="auth-success">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>

        </form>

        <p className="auth-footer">

          Already have an account?{" "}

          <Link to="/login">
            Sign in
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

export default Signup;