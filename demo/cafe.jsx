export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Espresso", price: "¥450", desc: "深煎り豆の芳醇なショット" },
    { name: "Cafe Latte", price: "¥550", desc: "まろやかなミルクとエスプレッソ" },
    { name: "Matcha Latte", price: "¥600", desc: "京都産抹茶の贅沢ラテ" },
    { name: "Drip Coffee", price: "¥400", desc: "本日の厳選シングルオリジン" },
    { name: "Affogato", price: "¥650", desc: "バニラジェラートにエスプレッソ" },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#faf7f2", minHeight: "100vh", color: "#3b2f1e" }}>
      {/* Header */}
      <header style={{
        background: "linear-gradient(135deg, #5c3d1a 0%, #8b6914 100%)",
        color: "#fff", padding: "48px 24px", textAlign: "center"
      }}>
        {/* SVG Logo */}
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ margin: "0 auto 16px" }}>
          <circle cx="32" cy="32" r="30" stroke="#f5e6c8" strokeWidth="2" fill="none" />
          <path d="M20 24c0 8 5 16 12 16s12-8 12-16" stroke="#f5e6c8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M44 24c3 0 6 2 6 5s-3 5-6 5" stroke="#f5e6c8" strokeWidth="2" strokeLinecap="round" fill="none" />
          <ellipse cx="32" cy="42" rx="14" ry="3" stroke="#f5e6c8" strokeWidth="1.5" fill="none" />
          <path d="M28 20c-1-4 0-8 4-10" stroke="#f5e6c8" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M32 18c0-5 2-8 5-10" stroke="#f5e6c8" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M36 20c1-4 0-7-2-9" stroke="#f5e6c8" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
        </svg>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>Komorebi Coffee</h1>
        <p style={{ opacity: 0.8, marginTop: 8, fontSize: 14 }}>木漏れ日の中で、一杯の安らぎを</p>
      </header>

      {/* Menu Toggle */}
      <div style={{ textAlign: "center", padding: "32px 24px 0" }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: menuOpen ? "#3b2f1e" : "#8b6914",
            color: "#fff", border: "none", borderRadius: 24,
            padding: "10px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer",
            transition: "background 0.2s"
          }}
        >
          {menuOpen ? "Close Menu" : "View Menu"}
        </button>
      </div>

      {/* Menu */}
      {menuOpen && (
        <div style={{ maxWidth: 480, margin: "24px auto", padding: "0 24px" }}>
          {menuItems.map((item, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              padding: "16px 0", borderBottom: "1px solid #e8dcc8"
            }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: "#8a7a66", marginTop: 2 }}>{item.desc}</div>
              </div>
              <span style={{ fontWeight: 700, color: "#8b6914", fontSize: 15, whiteSpace: "nowrap", marginLeft: 16 }}>{item.price}</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "40px 24px", fontSize: 12, color: "#8a7a66" }}>
        <p>Open 8:00 - 18:00 / Closed on Wednesdays</p>
      </footer>
    </div>
  );
}
