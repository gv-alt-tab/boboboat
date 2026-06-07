import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { supabase } from "./supabase.js";

const theme = {
  ocean: "#006994",
  deepSea: "#003D5C",
  coral: "#FF6B4A",
  seafoam: "#A8D8C8",
  white: "#FFFDF7",
  text: "#1A2E3B",
  muted: "#7A9BAD",
};

const styles = `
  .auth-overlay {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .auth-box {
    background: #FFFDF7;
    border-radius: 24px;
    padding: 48px;
    width: 100%;
    max-width: 440px;
    box-shadow: 0 24px 80px rgba(0,61,92,0.2);
  }

  .auth-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    font-weight: 700;
    color: #006994;
    text-align: center;
    margin-bottom: 8px;
  }

  .auth-logo span { color: #FF6B4A; font-style: italic; }

  .auth-subtitle {
    text-align: center;
    color: #7A9BAD;
    font-size: 0.9rem;
    margin-bottom: 32px;
  }

  .auth-tabs {
    display: flex;
    background: rgba(0,105,148,0.06);
    border-radius: 12px;
    padding: 4px;
    margin-bottom: 28px;
  }

  .auth-tab {
    flex: 1;
    padding: 10px;
    text-align: center;
    border-radius: 10px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    border: none;
    background: none;
    color: #7A9BAD;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }

  .auth-tab.active {
    background: white;
    color: #006994;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  .auth-role-tabs {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
  }

  .auth-role-tab {
    flex: 1;
    padding: 14px;
    text-align: center;
    border-radius: 14px;
    font-size: 0.88rem;
    font-weight: 500;
    cursor: pointer;
    border: 1.5px solid rgba(0,105,148,0.15);
    background: white;
    color: #7A9BAD;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }

  .auth-role-tab.active {
    border-color: #006994;
    color: #006994;
    background: rgba(0,105,148,0.06);
  }

  .auth-role-icon { font-size: 1.4rem; display: block; margin-bottom: 4px; }

  .auth-group {
    margin-bottom: 16px;
  }

  .auth-group label {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    color: #7A9BAD;
    margin-bottom: 6px;
  }

  .auth-group input {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid rgba(0,105,148,0.15);
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    color: #1A2E3B;
    background: white;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }

  .auth-group input:focus { border-color: #006994; }

  .auth-btn {
    width: 100%;
    padding: 14px;
    background: #006994;
    color: white;
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 8px;
    transition: all 0.2s;
  }

  .auth-btn:hover { background: #003D5C; }
  .auth-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .auth-error {
    background: rgba(255,107,74,0.1);
    border: 1px solid rgba(255,107,74,0.3);
    color: #FF6B4A;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 0.85rem;
    margin-bottom: 16px;
  }

  .auth-success {
    background: rgba(46,155,110,0.1);
    border: 1px solid rgba(46,155,110,0.3);
    color: #2E9B6E;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 0.85rem;
    margin-bottom: 16px;
  }

  .auth-close {
    position: absolute;
    top: 16px; right: 16px;
    background: none;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
    color: #7A9BAD;
    line-height: 1;
  }

  .auth-divider {
    text-align: center;
    color: #7A9BAD;
    font-size: 0.8rem;
    margin: 20px 0;
    position: relative;
  }

  .auth-divider::before, .auth-divider::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background: rgba(0,105,148,0.1);
  }

  .auth-divider::before { left: 0; }
  .auth-divider::after { right: 0; }
`;

export default function Auth({ onClose, onSuccess }) {
	const { t } = useTranslation();
  const [mode, setMode] = useState("login"); // login | register
  const [role, setRole] = useState("customer"); // customer | provider
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      onSuccess(data.user);
    }
    setLoading(false);
  };

  const handleRegister = async () => {
  setLoading(true);
  setError("");
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: role,
      }
    }
  });
  if (error) {
    setError(error.message);
  } else {
    setSuccess(t('auth_created'));
    setMode("login");
  }
  setLoading(false);
};

  return (
    <>
      <style>{styles}</style>
      <div className="auth-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="auth-box" style={{ position: "relative" }}>
          <button className="auth-close" onClick={onClose}>×</button>

          <div className="auth-logo">BoBo<span>Boat</span></div>
          <div className="auth-subtitle">
            {mode === "login" ? t('auth_welcome_back') : t('auth_join')}
          </div>

          <div className="auth-tabs">
            <button className={`auth-tab ${mode === "login" ? "active" : ""}`} onClick={() => { setMode("login"); setError(""); }}>
              {t('auth_login')}
            </button>
            <button className={`auth-tab ${mode === "register" ? "active" : ""}`} onClick={() => { setMode("register"); setError(""); }}>
              {t('auth_register')}
            </button>
          </div>

          {mode === "register" && (
            <>
              <div className="auth-role-tabs">
                <button className={`auth-role-tab ${role === "customer" ? "active" : ""}`} onClick={() => setRole("customer")}>
                  <span className="auth-role-icon">🧳</span>
                  {t('auth_customer')}
                </button>
                <button className={`auth-role-tab ${role === "provider" ? "active" : ""}`} onClick={() => setRole("provider")}>
                  <span className="auth-role-icon">⚓</span>
                  {t('auth_provider')}
                </button>
              </div>

              <div className="auth-group">
                <label>{t('auth_full_name')}</label>
                <input
                  placeholder="Mario Rossi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </>
          )}

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <div className="auth-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="mario@esempio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="auth-btn"
            onClick={mode === "login" ? handleLogin : handleRegister}
            disabled={loading}
          >
            {loading ? "..." : mode === "login" ? t('auth_submit_login') : 				t('auth_submit_register')}
          </button>
        </div>
      </div>
    </>
  );
}