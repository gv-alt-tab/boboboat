import { useState } from "react";

const theme = {
  sand: "#F5EDD6",
  ocean: "#006994",
  oceanLight: "#0088BB",
  coral: "#FF6B4A",
  seafoam: "#A8D8C8",
  deepSea: "#003D5C",
  white: "#FFFDF7",
  text: "#1A2E3B",
  muted: "#7A9BAD",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: ${theme.white};
    color: ${theme.text};
    overflow-x: hidden;
  }

  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 48px;
    background: rgba(255,253,247,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(0,105,148,0.1);
  }

  .logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: ${theme.ocean};
    letter-spacing: -0.5px;
  }

  .logo span { color: ${theme.coral}; font-style: italic; }

  .nav-links {
    display: flex; gap: 32px; align-items: center;
  }

  .nav-links a {
    text-decoration: none;
    color: ${theme.text};
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.3px;
    transition: color 0.2s;
    cursor: pointer;
  }

  .nav-links a:hover { color: ${theme.ocean}; }

  .btn-primary {
    background: ${theme.ocean};
    color: white;
    border: none;
    padding: 10px 22px;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-primary:hover {
    background: ${theme.deepSea};
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0,105,148,0.3);
  }

  .btn-coral {
    background: ${theme.coral};
    color: white;
    border: none;
    padding: 14px 32px;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-coral:hover {
    background: #e55a38;
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(255,107,74,0.4);
  }

  .btn-outline {
    background: transparent;
    color: ${theme.ocean};
    border: 1.5px solid ${theme.ocean};
    padding: 10px 22px;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-outline:hover {
    background: ${theme.ocean};
    color: white;
  }

  /* HERO */
  .hero {
    min-height: 100vh;
    background: linear-gradient(160deg, ${theme.deepSea} 0%, ${theme.ocean} 50%, ${theme.oceanLight} 100%);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center;
    padding: 120px 24px 140px;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 120px;
    background: ${theme.white};
    clip-path: ellipse(55% 100% at 50% 100%);
  }

  .wave-bg {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    opacity: 0.06;
    background-image: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 40px,
      rgba(255,255,255,0.5) 40px,
      rgba(255,255,255,0.5) 41px
    );
  }

  .hero-tag {
    display: inline-block;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.3);
    color: white;
    padding: 6px 18px;
    border-radius: 100px;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 28px;
    backdrop-filter: blur(8px);
  }

  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.8rem, 6vw, 5rem);
    color: white;
    line-height: 1.1;
    max-width: 700px;
    margin-bottom: 20px;
  }

  .hero h1 em {
    font-style: italic;
    color: ${theme.seafoam};
  }

  .hero p {
    color: rgba(255,255,255,0.8);
    font-size: 1.1rem;
    max-width: 480px;
    line-height: 1.7;
    margin-bottom: 40px;
    font-weight: 300;
  }

  .hero-btns {
    display: flex; gap: 14px; flex-wrap: wrap; justify-content: center;
  }

  /* SEARCH BOX */
  .search-section {
    padding: 60px 24px;
    max-width: 900px;
    margin: 0 auto;
  }

  .search-box {
    background: white;
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 20px 60px rgba(0,105,148,0.12);
    border: 1px solid rgba(0,105,148,0.08);
  }

  .search-box h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    margin-bottom: 24px;
    color: ${theme.deepSea};
  }

  .search-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr auto;
    gap: 12px;
    align-items: end;
  }

  .field label {
    display: block;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: ${theme.muted};
    margin-bottom: 6px;
  }

  .field input, .field select {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid rgba(0,105,148,0.15);
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    color: ${theme.text};
    background: ${theme.white};
    outline: none;
    transition: border-color 0.2s;
  }

  .field input:focus, .field select:focus {
    border-color: ${theme.ocean};
  }

  /* TOURS */
  .section {
    padding: 80px 24px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .section-header {
    display: flex; align-items: baseline; justify-content: space-between;
    margin-bottom: 40px;
  }

  .section-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    color: ${theme.deepSea};
  }

  .section-header a {
    color: ${theme.ocean};
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
  }

  .tours-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
  }

  .tour-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,61,92,0.08);
    border: 1px solid rgba(0,105,148,0.06);
    transition: all 0.3s;
    cursor: pointer;
  }

  .tour-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 48px rgba(0,61,92,0.14);
  }

  .tour-img {
    height: 200px;
    position: relative;
    overflow: hidden;
  }

  .tour-img-bg {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    font-size: 4rem;
  }

  .tour-badge {
    position: absolute; top: 14px; left: 14px;
    background: rgba(255,253,247,0.95);
    color: ${theme.ocean};
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 100px;
  }

  .spots-badge {
    position: absolute; top: 14px; right: 14px;
    background: ${theme.coral};
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 100px;
  }

  .tour-body {
    padding: 20px;
  }

  .tour-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
    margin-bottom: 6px;
    color: ${theme.deepSea};
  }

  .tour-meta {
    display: flex; gap: 16px;
    color: ${theme.muted};
    font-size: 0.82rem;
    margin-bottom: 16px;
  }

  .tour-price-row {
    display: flex; align-items: baseline; justify-content: space-between;
  }

  .price-dynamic {
    font-size: 0.75rem;
    color: ${theme.muted};
    margin-bottom: 2px;
  }

  .price-big {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    color: ${theme.ocean};
    font-weight: 700;
  }

  .price-big span {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 400;
    color: ${theme.muted};
  }

  /* HOW IT WORKS */
  .how-section {
    background: linear-gradient(135deg, ${theme.deepSea}, ${theme.ocean});
    padding: 80px 24px;
    color: white;
    text-align: center;
  }

  .how-section h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    margin-bottom: 12px;
    color: white;
  }

  .how-section p {
    color: rgba(255,255,255,0.7);
    max-width: 440px;
    margin: 0 auto 60px;
    font-weight: 300;
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 32px;
    max-width: 900px;
    margin: 0 auto;
  }

  .step {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 20px;
    padding: 32px 24px;
    backdrop-filter: blur(8px);
  }

  .step-num {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    color: ${theme.seafoam};
    opacity: 0.5;
    line-height: 1;
    margin-bottom: 16px;
  }

  .step h3 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: white;
  }

  .step p {
    font-size: 0.88rem;
    color: rgba(255,255,255,0.65);
    line-height: 1.6;
    margin: 0;
    max-width: none;
  }

  /* PRICING EXPLAINER */
  .pricing-section {
    padding: 80px 24px;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }

  .pricing-section h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    color: ${theme.deepSea};
    margin-bottom: 12px;
  }

  .pricing-section > p {
    color: ${theme.muted};
    margin-bottom: 48px;
  }

  .pricing-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    background: rgba(0,105,148,0.08);
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 24px;
  }

  .pricing-card {
    background: white;
    padding: 32px 24px;
    text-align: center;
  }

  .pricing-card.active {
    background: ${theme.ocean};
    color: white;
  }

  .pricing-card .seats {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${theme.muted};
    margin-bottom: 12px;
  }

  .pricing-card.active .seats { color: rgba(255,255,255,0.7); }

  .pricing-card .price {
    font-family: 'Playfair Display', serif;
    font-size: 2.4rem;
    color: ${theme.deepSea};
    font-weight: 700;
  }

  .pricing-card.active .price { color: white; }

  .pricing-card .price span { font-size: 1rem; font-weight: 400; }
  .pricing-card .note { font-size: 0.8rem; color: ${theme.muted}; margin-top: 8px; }
  .pricing-card.active .note { color: rgba(255,255,255,0.7); }

  /* FOOTER */
  .footer {
    background: ${theme.deepSea};
    color: rgba(255,255,255,0.6);
    text-align: center;
    padding: 40px 24px;
    font-size: 0.85rem;
  }

  .footer strong {
    color: white;
    font-family: 'Playfair Display', serif;
  }

  /* ====== DASHBOARD ====== */
  .dashboard {
    min-height: 100vh;
    background: #F0F4F8;
    padding-top: 72px;
  }

  .dash-nav {
    background: ${theme.deepSea};
  }

  .dash-sidebar {
    position: fixed;
    top: 72px; left: 0; bottom: 0;
    width: 240px;
    background: white;
    border-right: 1px solid rgba(0,105,148,0.1);
    padding: 24px 0;
    overflow-y: auto;
  }

  .sidebar-label {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: ${theme.muted};
    padding: 0 20px;
    margin-bottom: 8px;
    margin-top: 24px;
  }

  .sidebar-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 20px;
    font-size: 0.9rem;
    font-weight: 500;
    color: ${theme.text};
    cursor: pointer;
    transition: all 0.15s;
    border-left: 3px solid transparent;
  }

  .sidebar-item:hover { background: rgba(0,105,148,0.05); }
  .sidebar-item.active {
    background: rgba(0,105,148,0.08);
    color: ${theme.ocean};
    border-left-color: ${theme.ocean};
  }

  .dash-main {
    margin-left: 240px;
    padding: 32px;
  }

  .dash-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 32px;
  }

  .dash-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    color: ${theme.deepSea};
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 32px;
  }

  .stat-card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    border: 1px solid rgba(0,105,148,0.07);
  }

  .stat-label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: ${theme.muted};
    margin-bottom: 10px;
  }

  .stat-value {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    color: ${theme.deepSea};
    font-weight: 700;
  }

  .stat-sub {
    font-size: 0.8rem;
    color: ${theme.muted};
    margin-top: 4px;
  }

  .stat-sub.green { color: #2E9B6E; }

  .dash-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 24px;
  }

  .dash-card {
    background: white;
    border-radius: 16px;
    padding: 24px;
    border: 1px solid rgba(0,105,148,0.07);
  }

  .dash-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: ${theme.deepSea};
    margin-bottom: 20px;
    display: flex; align-items: center; justify-content: space-between;
  }

  .dash-card h3 button {
    font-size: 0.8rem;
    font-family: 'DM Sans', sans-serif;
    background: ${theme.ocean};
    color: white;
    border: none;
    padding: 6px 14px;
    border-radius: 100px;
    cursor: pointer;
  }

  .tour-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 0;
    border-bottom: 1px solid rgba(0,105,148,0.07);
  }

  .tour-row:last-child { border-bottom: none; }

  .tour-row-left { display: flex; align-items: center; gap: 12px; }

  .tour-emoji {
    width: 40px; height: 40px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem;
    background: rgba(0,105,148,0.07);
  }

  .tour-row-name { font-weight: 500; font-size: 0.9rem; color: ${theme.text}; }
  .tour-row-date { font-size: 0.78rem; color: ${theme.muted}; margin-top: 2px; }

  .tour-status {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 100px;
  }

  .status-full { background: #D1FAE5; color: #065F46; }
  .status-partial { background: #FEF3C7; color: #92400E; }
  .status-open { background: #DBEAFE; color: #1E40AF; }

  .fill-bar-wrap {
    height: 6px;
    background: rgba(0,105,148,0.1);
    border-radius: 100px;
    overflow: hidden;
    margin-top: 4px;
    width: 80px;
  }

  .fill-bar {
    height: 100%;
    border-radius: 100px;
    background: ${theme.ocean};
    transition: width 0.4s;
  }

  .form-card {
    background: white;
    border-radius: 16px;
    padding: 28px;
    border: 1px solid rgba(0,105,148,0.07);
    margin-bottom: 20px;
  }

  .form-card h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    color: ${theme.deepSea};
    margin-bottom: 20px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }

  .form-group label {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    color: ${theme.muted};
    margin-bottom: 6px;
  }

  .form-group input, .form-group select, .form-group textarea {
    width: 100%;
    padding: 11px 14px;
    border: 1.5px solid rgba(0,105,148,0.15);
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem;
    color: ${theme.text};
    background: ${theme.white};
    outline: none;
    transition: border-color 0.2s;
  }

  .form-group textarea { min-height: 80px; resize: vertical; }

  .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    border-color: ${theme.ocean};
  }

  .earnings-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid rgba(0,105,148,0.07);
    font-size: 0.88rem;
  }

  .earnings-row:last-child { border-bottom: none; }
  .earn-label { color: ${theme.muted}; }
  .earn-val { font-weight: 600; color: ${theme.deepSea}; }
  .earn-val.green { color: #2E9B6E; }

  @media (max-width: 768px) {
    .search-grid { grid-template-columns: 1fr; }
    .stats-row { grid-template-columns: 1fr 1fr; }
    .dash-grid { grid-template-columns: 1fr; }
    .dash-sidebar { display: none; }
    .dash-main { margin-left: 0; padding: 16px; }
    .pricing-cards { grid-template-columns: 1fr; gap: 2px; }
    .nav { padding: 16px 20px; }
    .nav-links { gap: 14px; }
  }
`;

const tours = [
  {
    emoji: "🌊",
    bg: "linear-gradient(135deg, #006994, #0088BB)",
    title: "Grotta dello Smeraldo",
    duration: "4h",
    seats: 6,
    booked: 4,
    totalPrice: 300,
    badge: "Capri & Amalfi",
  },
  {
    emoji: "⛵",
    bg: "linear-gradient(135deg, #FF6B4A, #FFB347)",
    title: "Tramonto a Positano",
    duration: "3h",
    seats: 4,
    booked: 2,
    totalPrice: 200,
    badge: "Costiera",
  },
  {
    emoji: "🐟",
    bg: "linear-gradient(135deg, #2E9B6E, #A8D8C8)",
    title: "Snorkeling Li Galli",
    duration: "5h",
    seats: 8,
    booked: 8,
    totalPrice: 480,
    badge: "Sorrento",
  },
];

const dashTours = [
  { emoji: "🌊", name: "Grotta dello Smeraldo", date: "28 Mag · 09:00", filled: 4, total: 6, status: "partial" },
  { emoji: "⛵", name: "Tramonto a Positano", date: "29 Mag · 17:30", filled: 4, total: 4, status: "full" },
  { emoji: "🐟", name: "Snorkeling Li Galli", date: "1 Giu · 10:00", filled: 1, total: 8, status: "open" },
];

function LandingPage({ onSwitch }) {
  const [tab, setTab] = useState("client");

  return (
    <div>
      {/* NAV */}
      <nav className="nav">
        <div className="logo">BoBo<span>Boat</span></div>
        <div className="nav-links">
          <a>Tour</a>
          <a>Come funziona</a>
          <a onClick={onSwitch}>Sei un fornitore?</a>
          <button className="btn-primary" onClick={onSwitch}>Accedi</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="wave-bg" />
        <div className="hero-tag">🚤 Sorrento · Amalfi · Capri</div>
        <h1>
          Scopri il mare<br />
          <em>come non lo hai mai fatto</em>
        </h1>
        <p>
          Prenota un posto in barca con altri viaggiatori. Il prezzo scende man mano che la barca si riempie.
        </p>
        <div className="hero-btns">
          <button className="btn-coral">Esplora i tour →</button>
          <button className="btn-outline" style={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }} onClick={onSwitch}>
            Sei un armatore?
          </button>
        </div>
      </section>

      {/* SEARCH */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginTop: 48 }} className="search-box">
          <h2>Trova il tuo tour</h2>
          <div className="search-grid">
            <div className="field">
              <label>Destinazione</label>
              <input placeholder="es. Capri, Positano, Amalfi..." />
            </div>
            <div className="field">
              <label>Data</label>
              <input type="date" />
            </div>
            <div className="field">
              <label>Persone</label>
              <select>
                <option>1 persona</option>
                <option>2 persone</option>
                <option>3 persone</option>
                <option>4+ persone</option>
              </select>
            </div>
            <button className="btn-primary" style={{ padding: "12px 24px", borderRadius: 12 }}>
              Cerca
            </button>
          </div>
        </div>
      </div>

      {/* TOURS */}
      <section className="section">
        <div className="section-header">
          <h2>Tour in evidenza</h2>
          <a>Vedi tutti →</a>
        </div>
        <div className="tours-grid">
          {tours.map((t, i) => {
            const pricePerPerson = Math.ceil(t.totalPrice / Math.max(t.booked, 1));
            const priceFull = Math.ceil(t.totalPrice / t.seats);
            return (
              <div className="tour-card" key={i}>
                <div className="tour-img" style={{ background: t.bg }}>
                  <div className="tour-img-bg">{t.emoji}</div>
                  <div className="tour-badge">{t.badge}</div>
                  {t.booked < t.seats && (
                    <div className="spots-badge">{t.seats - t.booked} posti liberi</div>
                  )}
                </div>
                <div className="tour-body">
                  <div className="tour-title">{t.title}</div>
                  <div className="tour-meta">
                    <span>⏱ {t.duration}</span>
                    <span>👥 {t.booked}/{t.seats} posti</span>
                  </div>
                  <div className="tour-price-row">
                    <div>
                      <div className="price-dynamic">
                        {t.booked === t.seats ? "Prezzo confermato" : "Prezzo attuale"}
                      </div>
                      <div className="price-big">
                        €{pricePerPerson} <span>/ persona</span>
                      </div>
                      {t.booked < t.seats && (
                        <div style={{ fontSize: "0.75rem", color: "#2E9B6E", marginTop: 2 }}>
                          →  €{priceFull} a barca piena
                        </div>
                      )}
                    </div>
                    <button className="btn-primary">Prenota</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRICING EXPLAINER */}
      <section className="pricing-section">
        <h2>Come funziona il prezzo</h2>
        <p>Il prezzo per persona diminuisce man mano che altri si uniscono al tour. Esempio su una barca da 4 posti a €200 totali.</p>
        <div className="pricing-cards">
          <div className="pricing-card">
            <div className="seats">1 prenotazione</div>
            <div className="price">€200 <span>/pers.</span></div>
            <div className="note">Prezzo si blocca -1h</div>
          </div>
          <div className="pricing-card active">
            <div className="seats">2 prenotazioni</div>
            <div className="price">€100 <span>/pers.</span></div>
            <div className="note">Prezzo si blocca -1h</div>
          </div>
          <div className="pricing-card">
            <div className="seats">4 prenotazioni ✓</div>
            <div className="price">€50 <span>/pers.</span></div>
            <div className="note">Barca piena, confermato!</div>
          </div>
        </div>
        <p style={{ fontSize: "0.82rem", color: theme.muted }}>
          + 5% commissione piattaforma · Pagamento sospeso fino alla conferma
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <h2>Semplice come salire a bordo</h2>
        <p>Tre passi e sei in mare.</p>
        <div className="steps">
          {[
            { n: "01", t: "Scegli il tour", d: "Sfoglia i tour disponibili nella tua zona e data preferita." },
            { n: "02", t: "Prenota il posto", d: "Inserisci i dati e autorizza il pagamento. Non viene addebitato subito." },
            { n: "03", t: "Conferma o rinuncia", d: "1 ora prima del tour il prezzo si blocca. Scegli se confermare o ricevere il rimborso." },
          ].map((s, i) => (
            <div className="step" key={i}>
              <div className="step-num">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div style={{ marginBottom: 8 }}>
          <strong>BoBoBoat</strong> · Tour in barca condivisi
        </div>
        <div>© 2025 BoBoBoat · Sorrento, Italia · hello@boboboat.com</div>
      </footer>
    </div>
  );
}

function Dashboard({ onSwitch }) {
  const [activeTab, setActiveTab] = useState("overview");

  const sidebarItems = [
    { id: "overview", icon: "📊", label: "Panoramica" },
    { id: "tours", icon: "🚤", label: "I miei tour" },
    { id: "new", icon: "➕", label: "Nuovo tour" },
    { id: "earnings", icon: "💰", label: "Guadagni" },
    { id: "reviews", icon: "⭐", label: "Recensioni" },
  ];

  return (
    <div className="dashboard">
      <nav className="nav dash-nav" style={{ background: theme.deepSea }}>
        <div className="logo" style={{ color: "white" }}>BoBo<span style={{ color: theme.seafoam }}>Boat</span></div>
        <div className="nav-links">
          <a style={{ color: "rgba(255,255,255,0.7)" }} onClick={onSwitch}>← Vista clienti</a>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: theme.coral,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer"
          }}>M</div>
        </div>
      </nav>

      <div className="dash-sidebar">
        <div className="sidebar-label">Menu</div>
        {sidebarItems.map(item => (
          <div
            key={item.id}
            className={`sidebar-item ${activeTab === item.id ? "active" : ""}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="dash-main">
        {activeTab === "overview" && (
          <>
            <div className="dash-header">
              <div>
                <h1>Buongiorno, Marco 👋</h1>
                <div style={{ color: theme.muted, fontSize: "0.9rem", marginTop: 4 }}>
                  Hai 3 tour programmati questa settimana
                </div>
              </div>
              <button className="btn-primary" onClick={() => setActiveTab("new")}>
                + Nuovo tour
              </button>
            </div>

            <div className="stats-row">
              {[
                { label: "Tour questo mese", value: "7", sub: "+2 rispetto al mese scorso", green: true },
                { label: "Passeggeri totali", value: "34", sub: "Media 4.8/tour" },
                { label: "Guadagni netti", value: "€1.840", sub: "Dopo commissione 5%", green: true },
                { label: "Rating medio", value: "4.9 ⭐", sub: "Basato su 28 recensioni" },
              ].map((s, i) => (
                <div className="stat-card" key={i}>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-value">{s.value}</div>
                  <div className={`stat-sub ${s.green ? "green" : ""}`}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="dash-grid">
              <div className="dash-card">
                <h3>Tour prossimi <button onClick={() => setActiveTab("tours")}>Vedi tutti</button></h3>
                {dashTours.map((t, i) => (
                  <div className="tour-row" key={i}>
                    <div className="tour-row-left">
                      <div className="tour-emoji">{t.emoji}</div>
                      <div>
                        <div className="tour-row-name">{t.name}</div>
                        <div className="tour-row-date">📅 {t.date}</div>
                        <div className="fill-bar-wrap">
                          <div className="fill-bar" style={{ width: `${(t.filled / t.total) * 100}%` }} />
                        </div>
                        <div style={{ fontSize: "0.72rem", color: theme.muted, marginTop: 2 }}>
                          {t.filled}/{t.total} posti
                        </div>
                      </div>
                    </div>
                    <span className={`tour-status status-${t.status}`}>
                      {t.status === "full" ? "Piena" : t.status === "partial" ? "Parziale" : "Aperta"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="dash-card">
                <h3>Guadagni</h3>
                {[
                  { label: "Maggio (in corso)", val: "€680", green: true },
                  { label: "Aprile", val: "€1.160", green: true },
                  { label: "Commissione BoBoBoat (5%)", val: "-€95" },
                  { label: "Prossimo pagamento", val: "€585", green: true },
                  { label: "Data pagamento", val: "31 Mag 2025" },
                ].map((r, i) => (
                  <div className="earnings-row" key={i}>
                    <span className="earn-label">{r.label}</span>
                    <span className={`earn-val ${r.green ? "green" : ""}`}>{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "new" && (
          <>
            <div className="dash-header">
              <h1>Crea nuovo tour</h1>
            </div>
            <div className="form-card">
              <h3>🚤 Dettagli del tour</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Nome del tour</label>
                  <input placeholder="es. Tramonto a Positano" />
                </div>
                <div className="form-group">
                  <label>Zona</label>
                  <select>
                    <option>Sorrento</option>
                    <option>Positano</option>
                    <option>Capri</option>
                    <option>Amalfi</option>
                    <option>Ravello</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Data</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>Ora di partenza</label>
                  <input type="time" defaultValue="09:00" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Durata (ore)</label>
                  <select>
                    <option>2 ore</option>
                    <option>3 ore</option>
                    <option>4 ore</option>
                    <option>5 ore</option>
                    <option>Giornata intera</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Posti disponibili</label>
                  <input type="number" placeholder="es. 6" min="1" max="20" />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <label>Descrizione del tour</label>
                <textarea placeholder="Descrivi l'itinerario, le soste, cosa è incluso nel prezzo..." />
              </div>
            </div>

            <div className="form-card">
              <h3>💰 Prezzo</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Prezzo totale del tour (€)</label>
                  <input type="number" placeholder="es. 400" />
                </div>
                <div className="form-group">
                  <label>Cosa è incluso</label>
                  <select>
                    <option>Solo barca e skipper</option>
                    <option>Barca, skipper e snorkeling</option>
                    <option>Tutto incluso (pranzo, bevande)</option>
                    <option>Personalizzato</option>
                  </select>
                </div>
              </div>
              <div style={{
                background: "rgba(0,105,148,0.06)",
                border: "1.5px solid rgba(0,105,148,0.15)",
                borderRadius: 12,
                padding: 16,
                fontSize: "0.85rem",
                color: theme.muted,
                lineHeight: 1.7,
              }}>
                💡 <strong style={{ color: theme.deepSea }}>Come funziona il prezzo:</strong> il prezzo per persona viene calcolato automaticamente dividendo il totale per i posti prenotati. I clienti vedono il prezzo in tempo reale. 1 ora prima del tour il prezzo si blocca e i clienti decidono se confermare.
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn-coral">Pubblica tour</button>
              <button className="btn-outline">Salva bozza</button>
            </div>
          </>
        )}

        {(activeTab === "tours" || activeTab === "earnings" || activeTab === "reviews") && (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>
              {activeTab === "tours" ? "🚤" : activeTab === "earnings" ? "💰" : "⭐"}
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: theme.deepSea, marginBottom: 8 }}>
              {activeTab === "tours" ? "I miei tour" : activeTab === "earnings" ? "Guadagni" : "Recensioni"}
            </h2>
            <p style={{ color: theme.muted }}>Sezione in costruzione nel prototipo. Clicca <strong>Panoramica</strong> o <strong>Nuovo tour</strong> per esplorare.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("landing");

  return (
    <>
      <style>{styles}</style>
      {view === "landing"
        ? <LandingPage onSwitch={() => setView("dashboard")} />
        : <Dashboard onSwitch={() => setView("landing")} />
      }
    </>
  );
}
