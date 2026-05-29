import { useState } from "react";

/* ─────────────────────────────────────────
   TOP NAVBAR COMPONENT
   The hamburger icon sits at the bottom-left
   corner of the navbar and toggles the sidebar.
───────────────────────────────────────── */
function TopNavbar({ sidebarOpen, onToggle }) {
  return (
    <header className="topnav">
      {/* ── Top row: logo + nav links + actions ── */}
      <div className="topnav__row">
        <div className="topnav__logo">
          <span className="logo-mark">◈</span>
          <span className="logo-text">NXUS</span>
        </div>

        <nav className="topnav__links">
          {["Overview", "Projects", "Analytics", "Team"].map((l, i) => (
            <a key={l} className={`nav-link ${i === 0 ? "nav-link--active" : ""}`} href="#">
              {l}
            </a>
          ))}
        </nav>

        <div className="topnav__actions">
          <button className="action-btn" title="Search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
          <button className="action-btn" title="Notifications">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span className="notif-dot" />
          </button>
          <div className="avatar">HJ</div>
        </div>
      </div>

      {/* ── Bottom strip: breadcrumb + toggle icon ── */}
      <div className="topnav__strip">
        <button
          className={`sidebar-toggle ${sidebarOpen ? "sidebar-toggle--open" : ""}`}
          onClick={onToggle}
          aria-label="Toggle sidebar"
        >
          <span className="bar" />
          <span className="bar bar--mid" style={{ width: sidebarOpen ? "60%" : "100%" }} />
          <span className="bar" />
        </button>

        <div className="breadcrumb">
          <span className="bc-root">Dashboard</span>
          <span className="bc-sep">/</span>
          <span className="bc-current">Overview</span>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────
   SIDEBAR COMPONENT
───────────────────────────────────────── */
const NAV_ITEMS = [
  { icon: "⊞", label: "Dashboard", active: true },
  { icon: "◈", label: "Projects" },
  { icon: "◉", label: "Analytics", badge: 3 },
  { icon: "◎", label: "Messages", badge: 9 },
  { icon: "◇", label: "Calendar" },
  { icon: "◆", label: "Files" },
  { icon: "◯", label: "Settings" },
];

function Sidebar({ open }) {
  return (
    <aside className={`sidebar ${open ? "sidebar--open" : "sidebar--closed"}`}>
      <nav className="sidebar__nav">
        {NAV_ITEMS.map((item) => (
          <div key={item.label} className={`sitem ${item.active ? "sitem--active" : ""}`}>
            <span className="sitem__icon">{item.icon}</span>
            <span className="sitem__label">{item.label}</span>
            {item.badge && <span className="sitem__badge">{item.badge}</span>}
          </div>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="sf-avatar">HJ</div>
        <div className="sf-info">
          <p className="sf-name">Hii Ji</p>
          <p className="sf-role">Admin</p>
        </div>
      </div>
    </aside>
  );
}

/* ─────────────────────────────────────────
   MAIN CONTENT
───────────────────────────────────────── */
function MainContent() {
  return (
    <main className="main">
      <div className="main__inner">
        <p className="section-label">OVERVIEW</p>

        {/* Stats */}
        <div className="stats-grid">
          {[
            { label: "REVENUE", value: "$84.2k", delta: "+12%", color: "#f0e040" },
            { label: "USERS", value: "3,291", delta: "+5%", color: "#40c4ff" },
            { label: "ORDERS", value: "1,048", delta: "+9%", color: "#ff9040" },
            { label: "CHURN", value: "2.4%", delta: "−0.3%", color: "#b06aff" },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <p className="stat-label">{s.label}</p>
              <p className="stat-value">{s.value}</p>
              <span className="stat-delta" style={{ color: s.color, background: s.color + "1a" }}>
                {s.delta}
              </span>
            </div>
          ))}
        </div>

        {/* Activity */}
        <div className="activity-card">
          <p className="section-label">RECENT ACTIVITY</p>
          {[
            { dot: "#f0e040", text: "New order #1048 received", time: "2m ago" },
            { dot: "#40c4ff", text: "User @mira left a review", time: "18m ago" },
            { dot: "#40ffb0", text: "Deploy to production succeeded", time: "1h ago" },
            { dot: "#ff5c5c", text: "Payment failed — retry queued", time: "3h ago" },
            { dot: "#b06aff", text: "Weekly report generated", time: "6h ago" },
          ].map((a, i) => (
            <div key={i} className="aitem">
              <span className="aitem__dot" style={{ background: a.dot }} />
              <span className="aitem__text">{a.text}</span>
              <span className="aitem__time">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────
   ROOT LAYOUT
───────────────────────────────────────── */
export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Syne:wght@700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:        #0c0c0e;
          --surface:   #111114;
          --border:    #1e1e22;
          --text:      #c8c8d0;
          --muted:     #44444c;
          --accent:    #f0e040;
          --nav-h:     96px;   /* total navbar height (top-row + strip) */
          --top-row-h: 56px;
          --strip-h:   40px;
          --sidebar-w: 220px;
          --sidebar-closed-w: 0px;
          --trans:     320ms cubic-bezier(.4,0,.2,1);
          font-family: 'DM Mono', monospace;
        }

        body { background: var(--bg); color: var(--text); overflow: hidden; }

        /* ── TOPNAV ── */
        .topnav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 100;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
        }

        .topnav__row {
          height: var(--top-row-h);
          display: flex; align-items: center;
          padding: 0 20px;
          gap: 24px;
          border-bottom: 1px solid var(--border);
        }

        .topnav__logo { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .logo-mark { font-size: 18px; color: var(--accent); line-height: 1; }
        .logo-text {
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: 15px; letter-spacing: .06em; color: var(--accent);
        }

        .topnav__links { display: flex; align-items: center; gap: 2px; flex: 1; }
        .nav-link {
          font-size: 11px; color: var(--muted); text-decoration: none;
          padding: 5px 12px; border-radius: 6px;
          letter-spacing: .04em;
          transition: color 160ms, background 160ms;
        }
        .nav-link:hover { color: var(--text); background: #ffffff08; }
        .nav-link--active { color: var(--text); }

        .topnav__actions { display: flex; align-items: center; gap: 8px; margin-left: auto; }
        .action-btn {
          width: 32px; height: 32px; border: none; background: none;
          color: var(--muted); cursor: pointer; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          transition: color 160ms, background 160ms; position: relative;
        }
        .action-btn:hover { color: var(--text); background: #ffffff08; }
        .notif-dot {
          position: absolute; top: 7px; right: 7px;
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent); border: 1.5px solid var(--bg);
        }
        .avatar {
          width: 30px; height: 30px; border-radius: 50%;
          background: #1e1e24; border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; color: #888; cursor: pointer;
        }

        /* ── STRIP (bottom of navbar) ── */
        .topnav__strip {
          height: var(--strip-h);
          display: flex; align-items: center;
          padding: 0 12px; gap: 14px;
        }

        .sidebar-toggle {
          display: flex; flex-direction: column;
          justify-content: center; align-items: flex-start;
          gap: 4px; width: 32px; height: 28px;
          padding: 6px 5px; border: none; background: none;
          cursor: pointer; border-radius: 6px;
          transition: background 160ms;
          flex-shrink: 0;
        }
        .sidebar-toggle:hover { background: #ffffff0a; }
        .bar {
          display: block; height: 1.5px; width: 100%;
          background: #888; border-radius: 2px;
          transition: width var(--trans), background 160ms;
        }
        .bar--mid { transition: width var(--trans); }
        .sidebar-toggle--open .bar { background: var(--accent); }

        .breadcrumb { display: flex; align-items: center; gap: 6px; }
        .bc-root { font-size: 11px; color: var(--muted); }
        .bc-sep  { font-size: 11px; color: #2a2a30; }
        .bc-current { font-size: 11px; color: var(--text); }

        /* ── BODY (below navbar) ── */
        .body-row {
          display: flex;
          height: calc(100vh - var(--nav-h));
          margin-top: var(--nav-h);
          overflow: hidden;
        }

        /* ── SIDEBAR ── */
        .sidebar {
          flex-shrink: 0;
          background: var(--surface);
          border-right: 1px solid var(--border);
          display: flex; flex-direction: column;
          overflow: hidden;
          transition: width var(--trans);
        }
        .sidebar--open   { width: var(--sidebar-w); }
        .sidebar--closed { width: 0; border-right-width: 0; }

        .sidebar__nav {
          flex: 1; padding: 12px 8px;
          display: flex; flex-direction: column; gap: 2px;
          overflow-y: auto; overflow-x: hidden;
        }

        .sitem {
          display: flex; align-items: center; gap: 10px;
          height: 38px; padding: 0 10px; border-radius: 8px;
          cursor: pointer; white-space: nowrap;
          transition: background 160ms;
          position: relative;
        }
        .sitem:hover { background: #ffffff06; }
        .sitem--active { background: #f0e04010; }
        .sitem--active::before {
          content: '';
          position: absolute; left: 0; top: 50%;
          transform: translateY(-50%);
          width: 2px; height: 55%;
          background: var(--accent);
          border-radius: 0 2px 2px 0;
        }
        .sitem__icon {
          font-size: 15px; flex-shrink: 0; line-height: 1;
          color: #555;
        }
        .sitem--active .sitem__icon { color: var(--accent); }
        .sitem__label { font-size: 12px; color: var(--muted); flex: 1; letter-spacing: .02em; }
        .sitem--active .sitem__label { color: var(--text); }
        .sitem__badge {
          font-size: 9px; padding: 2px 6px; border-radius: 10px;
          background: #f0e04018; color: var(--accent);
        }

        .sidebar__footer {
          display: flex; align-items: center; gap: 10px;
          padding: 12px; border-top: 1px solid var(--border);
          white-space: nowrap;
        }
        .sf-avatar {
          width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
          background: #1e1e24; border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; color: #777;
        }
        .sf-name { font-size: 11px; color: var(--text); margin-bottom: 1px; }
        .sf-role { font-size: 10px; color: var(--muted); }

        /* ── MAIN ── */
        .main {
          flex: 1; overflow-y: auto; overflow-x: hidden;
          transition: all var(--trans);
          min-width: 0;
        }
        .main__inner { padding: 28px; max-width: 900px; }

        .section-label {
          font-size: 9px; letter-spacing: .12em;
          color: var(--muted); margin-bottom: 18px;
        }

        /* Stats */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 14px; margin-bottom: 20px;
        }
        .stat-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 10px; padding: 18px;
          transition: border-color 200ms, transform 200ms;
        }
        .stat-card:hover { border-color: #2e2e36; transform: translateY(-1px); }
        .stat-label { font-size: 9px; color: var(--muted); letter-spacing: .1em; margin-bottom: 10px; }
        .stat-value {
          font-family: 'Syne', sans-serif; font-weight: 800;
          font-size: 26px; color: #eee; margin-bottom: 8px;
        }
        .stat-delta {
          font-size: 10px; padding: 3px 8px; border-radius: 5px;
        }

        /* Activity */
        .activity-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 10px; padding: 20px;
        }
        .aitem {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 0; border-bottom: 1px solid #141418;
        }
        .aitem:last-child { border-bottom: none; padding-bottom: 0; }
        .aitem__dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .aitem__text { font-size: 12px; color: #777; flex: 1; }
        .aitem__time { font-size: 10px; color: #333; flex-shrink: 0; }

        /* scrollbar */
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
      `}</style>

      {/* Fixed top navbar */}
      <TopNavbar sidebarOpen={sidebarOpen} onToggle={() => setSidebarOpen((o) => !o)} />

      {/* Below the navbar */}
      <div className="body-row">
        <Sidebar open={sidebarOpen} />
        <MainContent />
      </div>
    </>
  );
}