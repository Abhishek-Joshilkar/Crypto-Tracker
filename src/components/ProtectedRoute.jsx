import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "../styles/auth.css";

function AuthLoading() {
  return (
    <div className="auth-page">
      <div className="auth-loading-card">
        <div className="auth-spinner" />
        <p>Verifying secure session...</p>
      </div>
    </div>
  );
}

function AuthSetupNotice() {
  return (
    <div className="auth-page">
      <div className="auth-card auth-setup-card">
        <span className="auth-badge">Step 1 · Auth</span>
        <h1>Supabase not configured</h1>
        <p>
          Add your Supabase project URL and anon key to{" "}
          <code>.env</code>, then restart the dev server.
        </p>
        <pre className="auth-code">
{`VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key`}
        </pre>
      </div>
    </div>
  );
}

export default function ProtectedRoute({ children }) {
  const { user, loading, isConfigured } = useAuth();
  const location = useLocation();

  if (!isConfigured) {
    return <AuthSetupNotice />;
  }

  if (loading) {
    return <AuthLoading />;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
}

export function GuestRoute({ children }) {
  const { user, loading, isConfigured } = useAuth();

  if (!isConfigured) {
    return <AuthSetupNotice />;
  }

  if (loading) {
    return <AuthLoading />;
  }

  if (user) {
    return (
      <Navigate to="/dashboard" replace />
    );
  }

  return children;
}
