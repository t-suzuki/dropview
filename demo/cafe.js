export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  const drinks = [
    { id: 1, name: "Pour Over", price: 480, icon: "M12 2C10 2 8 4 8 6v2H6v12a2 2 0 002 2h8a2 2 0 002-2V8h-2V6c0-2-2-4-4-4z" },
    { id: 2, name: "Cappuccino", price: 520, icon: "M18 8h2a2 2 0 012 2v1a2 2 0 01-2 2h-2M4 8h14v9a4 4 0 01-4 4H8a4 4 0 01-4-4V8z" },
    { id: 3, name: "Cold Brew", price: 500, icon: "M8 2v4M12 2v4M16 2v4M6 6h12v14a2 2 0 01-2 2H8a2 2 0 01-2-2V6z" },
    { id: 4, name: "Chai Latte", price: 560, icon: "M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" },
  ];

  const styles = {
    page: { fontFamily: "'Segoe UI', sans-serif", background: "#1a1a2e", minHeight: "100vh", color: "#e0d6c8" },
    header: { padding: "48px 24px", textAlign: "center", background: "linear-gradient(180deg, #16213e 0%, #1a1a2e 100%)" },
    grid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, maxWidth: 420, margin: "0 auto", padding: "0 24px 40px" },
    card: (active) => ({
      background: active ? "#e0d6c8" : "#16213e",
      color: active ? "#1a1a2e" : "#e0d6c8",
      border: "1px solid #2a2a4a",
      borderRadius: 12, padding: 20, textAlign: "center", cursor: "pointer",
      transition: "all 0.2s"
    }),
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ margin: "0 auto 12px" }}>
          <rect x="2" y="2" width="52" height="52" rx="12" stroke="#c9a96e" strokeWidth="2" fill="none" />
          <circle cx="28" cy="28" r="14" stroke="#c9a96e" strokeWidth="1.5" fill="none" />
          <path d="M22 28c0-4 3-7 6-7s6 3 6 7" stroke="#c9a96e" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="28" cy="32" r="2" fill="#c9a96e" />
        </svg>
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: "#c9a96e" }}>Yoru Coffee</h1>
        <p style={{ fontSize: 13, opacity: 0.6, marginTop: 6 }}>夜に寄り添うコーヒースタンド</p>
      </header>

      <div style={{ padding: "32px 0 12px", textAlign: "center" }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: "#c9a96e" }}>Our Drinks</h2>
      </div>

      <div style={styles.grid}>
        {drinks.map(d => (
          <div key={d.id} style={styles.card(selectedItem === d.id)} onClick={() => setSelectedItem(selectedItem === d.id ? null : d.id)}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 8px" }}>
              <path d={d.icon} />
            </svg>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{d.name}</div>
            <div style={{ fontSize: 13, marginTop: 4, opacity: 0.7 }}>¥{d.price}</div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div style={{ textAlign: "center", padding: "0 24px 40px" }}>
          <div style={{
            background: "#16213e", border: "1px solid #c9a96e", borderRadius: 12,
            padding: "20px 24px", maxWidth: 420, margin: "0 auto"
          }}>
            <p style={{ fontSize: 14 }}>
              {drinks.find(d => d.id === selectedItem)?.name} をご注文ですか？
            </p>
            <button style={{
              marginTop: 12, background: "#c9a96e", color: "#1a1a2e", border: "none",
              borderRadius: 20, padding: "8px 24px", fontWeight: 600, fontSize: 13, cursor: "pointer"
            }}>
              Order Now
            </button>
          </div>
        </div>
      )}

      <footer style={{ textAlign: "center", padding: "24px", fontSize: 11, opacity: 0.4 }}>
        Open 18:00 - 25:00 / Weekdays Only
      </footer>
    </div>
  );
}
