import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authContext.jsx";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAdmin } = useAuth();

  // Redirect if already logged in
  if (isAdmin) { navigate("/admin/vehicles", { replace: true }); return null; }

  const handleLogin = (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    setTimeout(() => {
      if (username.trim() === "admin" && password.trim() === "admin123") {
        login(); sessionStorage.setItem("adminUsername", username.trim());
        navigate("/admin/vehicles", { replace: true });
      } else {
        setError("Invalid username or password.");
        setPassword(""); setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="lp">
      <div className="lp__card">
        {/* Header */}
        <div className="lp__head">
          <div className="lp__mark">VY</div>
          <div>
            <h2 className="lp__title">Vehicle Yard</h2>
            <p className="lp__sub">Administration Portal</p>
          </div>
        </div>

        <hr className="divider" />

        <h3 className="lp__form-title">Sign in to continue</h3>

        {error && (
          <div className="lp__error">
            <i className="bi bi-exclamation-circle" /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="lp__form">
          <div className="lp__group">
            <label className="lp__label">Username</label>
            <input
              type="text" className="vy-input" value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter username" required autoFocus
            />
          </div>
          <div className="lp__group">
            <label className="lp__label">Password</label>
            <input
              type="password" className="vy-input" value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password" required
            />
          </div>
          <button type="submit" className="btn-primary-vy lp__submit" disabled={loading}>
            {loading ? "Signing in..." : <><i className="bi bi-arrow-right-circle" /> Sign In</>}
          </button>
        </form>

        <div className="lp__hint">
          <i className="bi bi-info-circle" /> Demo: <strong>admin</strong> / <strong>admin123</strong>
        </div>
      </div>
    </div>
  );
}
