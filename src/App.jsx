import { useState } from "react";
import { useTranslation } from 'react-i18next';
import './i18n/index.js';
import { supabase } from './supabase.js'
import Auth from './Auth.jsx'

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
    background: #FFFDF7;
    color: #1A2E3B;
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
    color: #006994;
    letter-spacing: -0.5px;
  }

  .logo span { color: #FF6B4A; font-style: italic; }

  .nav-links {
    display: flex; gap: 24px; align-items: center;
  }

  .nav-links a {
    text-decoration: none;
    color: #1A2E3B;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.3px;
    transition: color 0.2s;
    cursor: pointer;
  }

  .nav-links a:hover { color: #006994; }

  .btn-primary {
    background: #006994;
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
    background: #003D5C;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0,105,148,0.3);
  }

  .btn-lang {
    background: #f0f0f0;
    color: #1A2E3B;
    border: 1px solid #ccc;
    padding: 6px 14px;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-lang:hover { background: #e0e0e0; }

  .btn-coral {
    background: #FF6B4A;
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
    color: #006994;
    border: 1.5px solid #006994;
    padding: 10px 22px;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-outline:hover { background: #006994; color: white; }

  .hero {
    min-height: 100vh;
    background: linear-gradient(160deg, #003D5C 0%, #006994 50%, #0088BB 100%);
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
    background: #FFFDF7;
    clip-path: ellipse(55% 100% at 50% 100%);
  }

  .wave-bg {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    opacity: 0.06;
    background-image: repeating-linear-gradient(
      0deg, transparent, transparent 40px,
      rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px
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

  .hero h1 em { font-style: italic; color: #A8D8C8; }

  .hero p {
    color: rgba(255,255,255,0.8);
    font-size: 1.1rem;
    max-width: 480px;
    line-height: 1.7;
    margin-bottom: 40px;
    font-weight: 300;
  }

  .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }

  .search-section { padding: 60px 24px; max-width: 900px; margin: 0 auto; }

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
    color: #003D5C;
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
    color: #7A9BAD;
    margin-bottom: 6px;
  }

  .field input, .field select {
    width: 100%;
    padding: 12px 16px;
    border: 1.5px solid rgba(0,105,148,0.15);
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    color: #1A2E3B;
    background: #FFFDF7;
    outline: none;
    transition: border-color 0.2s;
  }

  .field input:focus, .field select:focus { border-color: #006994; }

  .section { padding: 80px 24px; max-width: 1100px; margin: 0 auto; }

  .section-header {
    display: flex; align-items: baseline; justify-content: space-between;
    margin-bottom: 40px;
  }

  .section-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    color: #003D5C;
  }

  .section-header a { color: #006994; font-size: 0.9rem; font-weight: 500; cursor: pointer; text-decoration: none; }

  .tours-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }

  .tour-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,61,92,0.08);
    border: 1px solid rgba(0,105,148,0.06);
    transition: all 0.3s;
    cursor: pointer;
  }

  .tour-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(0,61,92,0.14); }

  .tour-img { height: 200px; position: relative; overflow: hidden; }
  .tour-img-bg { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 4rem; }

  .tour-badge {
    position: absolute; top: 14px; left: 14px;
    background: rgba(255,253,247,0.95);
    color: #006994;
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;
    padding: 4px 12px; border-radius: 100px;
  }

  .spots-badge {
    position: absolute; top: 14px; right: 14px;
    background: #FF6B4A; color: white;
    font-size: 0.75rem; font-weight: 600;
    padding: 4px 10px; border-radius: 100px;
  }

  .tour-body { padding: 20px; }
  .tour-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; margin-bottom: 6px; color: #003D5C; }
  .tour-meta { display: flex; gap: 16px; color: #7A9BAD; font-size: 0.82rem; margin-bottom: 16px; }
  .tour-price-row { display: flex; align-items: baseline; justify-content: space-between; }
  .price-dynamic { font-size: 0.75rem; color: #7A9BAD; margin-bottom: 2px; }
  .price-big { font-family: 'Playfair Display', serif; font-size: 1.6rem; color: #006994; font-weight: 700; }
  .price-big span { font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 400; color: #7A9BAD; }

  .how-section {
    background: linear-gradient(135deg, #003D5C, #006994);
    padding: 80px 24px; color: white; text-align: center;
  }

  .how-section h2 { font-family: 'Playfair Display', serif; font-size: 2.2rem; margin-bottom: 12px; color: white; }
  .how-section p { color: rgba(255,255,255,0.7); max-width: 440px; margin: 0 auto 60px; font-weight: 300; }

  .steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 32px; max-width: 900px; margin: 0 auto; }

  .step {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 20px; padding: 32px 24px;
    backdrop-filter: blur(8px);
  }

  .step-num { font-family: 'Playfair Display', serif; font-size: 3rem; color: #A8D8C8; opacity: 0.5; line-height: 1; margin-bottom: 16px; }
  .step h3 { font-size: 1rem; font-weight: 600; margin-bottom: 8px; color: white; }
  .step p { font-size: 0.88rem; color: rgba(255,255,255,0.65); line-height: 1.6; margin: 0; }

  .pricing-section { padding: 80px 24px; max-width: 900px; margin: 0 auto; text-align: center; }
  .pricing-section h2 { font-family: 'Playfair Display', serif; font-size: 2.2rem; color: #003D5C; margin-bottom: 12px; }
  .pricing-section > p { color: #7A9BAD; margin-bottom: 48px; }

  .pricing-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: rgba(0,105,148,0.08); border-radius: 20px; overflow: hidden; margin-bottom: 24px; }

  .pricing-card { background: white; padding: 32px 24px; text-align: center; }
  .pricing-card.active { background: #006994; color: white; }
  .pricing-card .seats { font-size: 0.75rem; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #7A9BAD; margin-bottom: 12px; }
  .pricing-card.active .seats { color: rgba(255,255,255,0.7); }
  .pricing-card .price { font-family: 'Playfair Display', serif; font-size: 2.4rem; color: #003D5C; font-weight: 700; }
  .pricing-card.active .price { color: white; }
  .pricing-card .price span { font-size: 1rem; font-weight: 400; }
  .pricing-card .note { font-size: 0.8rem; color: #7A9BAD; margin-top: 8px; }
  .pricing-card.active .note { color: rgba(255,255,255,0.7); }

  .footer { background: #003D5C; color: rgba(255,255,255,0.6); text-align: center; padding: 40px 24px; font-size: 0.85rem; }
  .footer strong { color: white; font-family: 'Playfair Display', serif; }

  .dashboard { min-height: 100vh; background: #F0F4F8; padding-top: 72px; }
  .dash-nav { background: #003D5C; }

  .dash-sidebar {
    position: fixed; top: 72px; left: 0; bottom: 0; width: 240px;
    background: white; border-right: 1px solid rgba(0,105,148,0.1);
    padding: 24px 0; overflow-y: auto;
  }

  .sidebar-label { font-size: 0.7rem; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #7A9BAD; padding: 0 20px; margin-bottom: 8px; margin-top: 24px; }

  .sidebar-item { display: flex; align-items: center; gap: 10px; padding: 10px 20px; font-size: 0.9rem; font-weight: 500; color: #1A2E3B; cursor: pointer; transition: all 0.15s; border-left: 3px solid transparent; }
  .sidebar-item:hover { background: rgba(0,105,148,0.05); }
  .sidebar-item.active { background: rgba(0,105,148,0.08); color: #006994; border-left-color: #006994; }

  .dash-main { margin-left: 240px; padding: 32px; }

  .dash-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; }
  .dash-header h1 { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: #003D5C; }

  .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }

  .stat-card { background: white; border-radius: 16px; padding: 24px; border: 1px solid rgba(0,105,148,0.07); }
  .stat-label { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: #7A9BAD; margin-bottom: 10px; }
  .stat-value { font-family: 'Playfair Display', serif; font-size: 2rem; color: #003D5C; font-weight: 700; }
  .stat-sub { font-size: 0.8rem; color: #7A9BAD; margin-top: 4px; }
  .stat-sub.green { color: #2E9B6E; }

  .dash-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }

  .dash-card { background: white; border-radius: 16px; padding: 24px; border: 1px solid rgba(0,105,148,0.07); }
  .dash-card h3 { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #003D5C; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; }
  .dash-card h3 button { font-size: 0.8rem; font-family: 'DM Sans', sans-serif; background: #006994; color: white; border: none; padding: 6px 14px; border-radius: 100px; cursor: pointer; }

  .tour-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid rgba(0,105,148,0.07); }
  .tour-row:last-child { border-bottom: none; }
  .tour-row-left { display: flex; align-items: center; gap: 12px; }
  .tour-emoji { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; background: rgba(0,105,148,0.07); }
  .tour-row-name { font-weight: 500; font-size: 0.9rem; color: #1A2E3B; }
  .tour-row-date { font-size: 0.78rem; color: #7A9BAD; margin-top: 2px; }

  .tour-status { font-size: 0.75rem; font-weight: 600; padding: 4px 10px; border-radius: 100px; }
  .status-full { background: #D1FAE5; color: #065F46; }
  .status-partial { background: #FEF3C7; color: #92400E; }
  .status-open { background: #DBEAFE; color: #1E40AF; }

  .fill-bar-wrap { height: 6px; background: rgba(0,105,148,0.1); border-radius: 100px; overflow: hidden; margin-top: 4px; width: 80px; }
  .fill-bar { height: 100%; border-radius: 100px; background: #006994; transition: width 0.4s; }

  .form-card { background: white; border-radius: 16px; padding: 28px; border: 1px solid rgba(0,105,148,0.07); margin-bottom: 20px; }
  .form-card h3 { font-family: 'Playfair Display', serif; font-size: 1.2rem; color: #003D5C; margin-bottom: 20px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .form-group label { display: block; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.4px; text-transform: uppercase; color: #7A9BAD; margin-bottom: 6px; }
  .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 11px 14px; border: 1.5px solid rgba(0,105,148,0.15); border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 0.92rem; color: #1A2E3B; background: #FFFDF7; outline: none; transition: border-color 0.2s; }
  .form-group textarea { min-height: 80px; resize: vertical; }
  .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #006994; }

  .earnings-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid rgba(0,105,148,0.07); font-size: 0.88rem; }
  .earnings-row:last-child { border-bottom: none; }
  .earn-label { color: #7A9BAD; }
  .earn-val { font-weight: 600; color: #003D5C; }
  .earn-val.green { color: #2E9B6E; }

  @media (max-width: 768px) {
    .search-grid { grid-template-columns: 1fr; }
    .stats-row { grid-template-columns: 1fr 1fr; }
    .dash-grid { grid-template-columns: 1fr; }
    .dash-sidebar { display: none; }
    .dash-main { margin-left: 0; padding: 16px; }
    .pricing-cards { grid-template-columns: 1fr; gap: 2px; }
    .nav { padding: 16px 20px; }
    .nav-links { gap: 8px; }
  }
`;

const tours = [
  { emoji: "🌊", bg: "linear-gradient(135deg, #006994, #0088BB)", title: "Grotta dello Smeraldo", duration: "4h", seats: 6, booked: 4, totalPrice: 300, badge: "Capri & Amalfi" },
  { emoji: "⛵", bg: "linear-gradient(135deg, #FF6B4A, #FFB347)", title: "Tramonto a Positano", duration: "3h", seats: 4, booked: 2, totalPrice: 200, badge: "Costiera" },
  { emoji: "🐟", bg: "linear-gradient(135deg, #2E9B6E, #A8D8C8)", title: "Snorkeling Li Galli", duration: "5h", seats: 8, booked: 8, totalPrice: 480, badge: "Sorrento" },
];

const dashTours = [
  { emoji: "🌊", name: "Grotta dello Smeraldo", date: "28 Mag · 09:00", filled: 4, total: 6, status: "partial" },
  { emoji: "⛵", name: "Tramonto a Positano", date: "29 Mag · 17:30", filled: 4, total: 4, status: "full" },
  { emoji: "🐟", name: "Snorkeling Li Galli", date: "1 Giu · 10:00", filled: 1, total: 8, status: "open" },
];

function LandingPage({ onSwitch, toggleLang, onLogin, user, onLogout }) {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <nav className="nav">
        <div className="logo">BoBo<span>Boat</span></div>
        <div className="nav-links">
          <a>{t('nav_tours')}</a>
          <a>{t('nav_how')}</a>
          <a onClick={onSwitch}>{t('nav_provider_q')}</a>
	<button className="btn-lang" onClick={toggleLang}>
	 {i18n.language === 'it' ? 'EN' : 'IT'}
	</button>          
	<button className="btn-primary" onClick={user ? () => { supabase.auth.signOut(); 	onLogout(); } : onLogin}>
  	{user ? `👤 ${user.email.split('@')[0]}` : t('nav_login')}
	</button>
        </div>
      </nav>

      <section className="hero">
        <div className="wave-bg" />
        <div className="hero-tag">🚤 {t('hero_tag')}</div>
        <h1>
          {t('hero_title_1')}<br />
          <em>{t('hero_title_2')}</em>
        </h1>
        <p>{t('hero_sub')}</p>
        <div className="hero-btns">
          <button className="btn-coral">{t('hero_btn1')}</button>
          <button className="btn-outline" style={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }} onClick={onSwitch}>
            {t('hero_btn2')}
          </button>
        </div>
      </section>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginTop: 48 }} className="search-box">
          <h2>{t('search_title')}</h2>
          <div className="search-grid">
            <div className="field">
              <label>{t('search_destination')}</label>
              <input placeholder={t('search_destination_placeholder')} />
            </div>
            <div className="field">
              <label>{t('search_date')}</label>
              <input type="date" />
            </div>
            <div className="field">
              <label>{t('search_people')}</label>
              <select>
                <option>{t('search_1')}</option>
                <option>{t('search_2')}</option>
                <option>{t('search_3')}</option>
                <option>{t('search_4')}</option>
              </select>
            </div>
            <button className="btn-primary" style={{ padding: "12px 24px", borderRadius: 12 }}>
              {t('search_btn')}
            </button>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="section-header">
          <h2>{t('tours_title')}</h2>
          <a>{t('tours_see_all')}</a>
        </div>
        <div className="tours-grid">
          {tours.map((tour, i) => {
            const pricePerPerson = Math.ceil(tour.totalPrice / Math.max(tour.booked, 1));
            const priceFull = Math.ceil(tour.totalPrice / tour.seats);
            return (
              <div className="tour-card" key={i}>
                <div className="tour-img" style={{ background: tour.bg }}>
                  <div className="tour-img-bg">{tour.emoji}</div>
                  <div className="tour-badge">{tour.badge}</div>
                  {tour.booked < tour.seats && (
                    <div className="spots-badge">{tour.seats - tour.booked} {t('tours_spots_left')}</div>
                  )}
                </div>
                <div className="tour-body">
                  <div className="tour-title">{tour.title}</div>
                  <div className="tour-meta">
                    <span>⏱ {tour.duration}</span>
                    <span>👥 {tour.booked}/{tour.seats}</span>
                  </div>
                  <div className="tour-price-row">
                    <div>
                      <div className="price-dynamic">
                        {tour.booked === tour.seats ? t('tours_price_confirmed') : t('tours_price_current')}
                      </div>
                      <div className="price-big">
                        €{pricePerPerson} <span>{t('tours_per_person')}</span>
                      </div>
                      {tour.booked < tour.seats && (
                        <div style={{ fontSize: "0.75rem", color: "#2E9B6E", marginTop: 2 }}>
                          {t('tours_full_price')} €{priceFull}
                        </div>
                      )}
                    </div>
                    <button className="btn-primary">{t('tours_book')}</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="pricing-section">
        <h2>{t('pricing_title')}</h2>
        <p>{t('pricing_sub')}</p>
        <div className="pricing-cards">
          <div className="pricing-card">
            <div className="seats">{t('pricing_1_seats')}</div>
            <div className="price">€200 <span>/pers.</span></div>
            <div className="note">{t('pricing_note')}</div>
          </div>
          <div className="pricing-card active">
            <div className="seats">{t('pricing_2_seats')}</div>
            <div className="price">€100 <span>/pers.</span></div>
            <div className="note">{t('pricing_note')}</div>
          </div>
          <div className="pricing-card">
            <div className="seats">{t('pricing_4_seats')}</div>
            <div className="price">€50 <span>/pers.</span></div>
            <div className="note">{t('pricing_full_note')}</div>
          </div>
        </div>
        <p style={{ fontSize: "0.82rem", color: "#7A9BAD" }}>{t('pricing_footer')}</p>
      </section>

      <section className="how-section">
        <h2>{t('how_title')}</h2>
        <p>{t('how_sub')}</p>
        <div className="steps">
          {[
            { n: t('step1_num'), t: t('step1_title'), d: t('step1_desc') },
            { n: t('step2_num'), t: t('step2_title'), d: t('step2_desc') },
            { n: t('step3_num'), t: t('step3_title'), d: t('step3_desc') },
          ].map((s, i) => (
            <div className="step" key={i}>
              <div className="step-num">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div style={{ marginBottom: 8 }}>
          <strong>BoBoBoat</strong> · {t('footer_tagline')}
        </div>
        <div>{t('footer_copy')}</div>
      </footer>
    </div>
  );
}

function Dashboard({ onSwitch, toggleLang }) {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");

  const sidebarItems = [
    { id: "overview", icon: "📊", label: t('dash_overview') },
    { id: "tours", icon: "🚤", label: t('dash_my_tours') },
    { id: "new", icon: "➕", label: t('dash_new') },
    { id: "earnings", icon: "💰", label: t('dash_earnings') },
    { id: "reviews", icon: "⭐", label: t('dash_reviews') },
  ];

  return (
    <div className="dashboard">
      <nav className="nav dash-nav" style={{ background: "#003D5C" }}>
        <div className="logo" style={{ color: "white" }}>BoBo<span style={{ color: "#A8D8C8" }}>Boat</span></div>
        <div className="nav-links">
          <a style={{ color: "rgba(255,255,255,0.7)" }} onClick={onSwitch}>{t('dash_client_view')}</a>
          <button className="btn-lang" onClick={toggleLang}>
            {i18n.language === 'it' ? 'EN' : 'IT'}
          </button>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#FF6B4A", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer" }}>M</div>
        </div>
      </nav>

      <div className="dash-sidebar">
        <div className="sidebar-label">Menu</div>
        {sidebarItems.map(item => (
          <div key={item.id} className={`sidebar-item ${activeTab === item.id ? "active" : ""}`} onClick={() => setActiveTab(item.id)}>
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
                <h1>{t('dash_greeting')}</h1>
                <div style={{ color: "#7A9BAD", fontSize: "0.9rem", marginTop: 4 }}>{t('dash_sub')}</div>
              </div>
              <button className="btn-primary" onClick={() => setActiveTab("new")}>{t('dash_new_tour')}</button>
            </div>

            <div className="stats-row">
              {[
                { label: t('stat_tours'), value: "7", sub: "+2", green: true },
                { label: t('stat_passengers'), value: "34", sub: "Avg 4.8/tour" },
                { label: t('stat_earnings'), value: "€1.840", sub: "-5% fee", green: true },
                { label: t('stat_rating'), value: "4.9 ⭐", sub: "28 reviews" },
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
                <h3>{t('dash_my_tours')} <button onClick={() => setActiveTab("tours")}>→</button></h3>
                {dashTours.map((tour, i) => (
                  <div className="tour-row" key={i}>
                    <div className="tour-row-left">
                      <div className="tour-emoji">{tour.emoji}</div>
                      <div>
                        <div className="tour-row-name">{tour.name}</div>
                        <div className="tour-row-date">📅 {tour.date}</div>
                        <div className="fill-bar-wrap">
                          <div className="fill-bar" style={{ width: `${(tour.filled / tour.total) * 100}%` }} />
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "#7A9BAD", marginTop: 2 }}>{tour.filled}/{tour.total}</div>
                      </div>
                    </div>
                    <span className={`tour-status status-${tour.status}`}>
                      {tour.status === "full" ? "Full" : tour.status === "partial" ? "Partial" : "Open"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="dash-card">
                <h3>{t('dash_earnings')}</h3>
                {[
                  { label: "May (ongoing)", val: "€680", green: true },
                  { label: "April", val: "€1.160", green: true },
                  { label: "BoBoBoat fee (5%)", val: "-€95" },
                  { label: "Next payout", val: "€585", green: true },
                  { label: "Payout date", val: "31 May 2025" },
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
              <h1>{t('form_title')}</h1>
            </div>
            <div className="form-card">
              <h3>🚤 Tour details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>{t('form_tour_name')}</label>
                  <input placeholder={t('form_tour_name_ph')} />
                </div>
                <div className="form-group">
                  <label>{t('form_zone')}</label>
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
                  <label>{t('form_date')}</label>
                  <input type="date" />
                </div>
                <div className="form-group">
                  <label>{t('form_time')}</label>
                  <input type="time" defaultValue="09:00" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{t('form_duration')}</label>
                  <select>
                    <option>2h</option>
                    <option>3h</option>
                    <option>4h</option>
                    <option>5h</option>
                    <option>Full day</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{t('form_spots')}</label>
                  <input type="number" placeholder="e.g. 6" min="1" max="20" />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <label>{t('form_description')}</label>
                <textarea placeholder={t('form_description_ph')} />
              </div>
            </div>

            <div className="form-card">
              <h3>💰 {t('form_price')}</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>{t('form_price')}</label>
                  <input type="number" placeholder="e.g. 400" />
                </div>
                <div className="form-group">
                  <label>{t('form_included')}</label>
                  <select>
                    <option>Boat & skipper only</option>
                    <option>Boat, skipper & snorkeling</option>
                    <option>All inclusive (lunch, drinks)</option>
                    <option>Custom</option>
                  </select>
                </div>
              </div>
              <div style={{ background: "rgba(0,105,148,0.06)", border: "1.5px solid rgba(0,105,148,0.15)", borderRadius: 12, padding: 16, fontSize: "0.85rem", color: "#7A9BAD", lineHeight: 1.7 }}>
                {t('form_tip')}
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button className="btn-coral">{t('form_publish')}</button>
              <button className="btn-outline">{t('form_draft')}</button>
            </div>
          </>
        )}

        {(activeTab === "tours" || activeTab === "earnings" || activeTab === "reviews") && (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>
              {activeTab === "tours" ? "🚤" : activeTab === "earnings" ? "💰" : "⭐"}
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#003D5C", marginBottom: 8 }}>
              {activeTab === "tours" ? t('dash_my_tours') : activeTab === "earnings" ? t('dash_earnings') : t('dash_reviews')}
            </h2>
            <p style={{ color: "#7A9BAD" }}>Coming soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("landing");
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);
  const { i18n } = useTranslation();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'it' ? 'en' : 'it');
  };

  return (
    <>
      <style>{styles}</style>
      {showAuth && (
        <Auth
          onClose={() => setShowAuth(false)}
          onSuccess={(user) => { setUser(user); setShowAuth(false); }}
        />
      )}
      {view === "landing"
        ? <LandingPage onSwitch={() => setView("dashboard")} toggleLang={toggleLang} 	onLogin={() => setShowAuth(true)} user={user} onLogout={() => setUser(null)} />
        : <Dashboard onSwitch={() => setView("landing")} toggleLang={toggleLang} 	onLogin={() => setShowAuth(true)} user={user} />
      }
    </>
  );
}
