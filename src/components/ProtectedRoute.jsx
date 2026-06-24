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
        <h1>Firebase not configured</h1>
        <p>
          Add your Firebase web app settings to{" "}
          <code>.env</code>, then restart the dev server.
        </p>
        <pre className="auth-code">
{`VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id`}
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
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
