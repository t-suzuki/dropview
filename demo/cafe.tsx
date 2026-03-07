interface MenuItem {
  name: string;
  price: number;
  desc: string;
  tag: "hot" | "cold" | "food";
}

const tagLabel: Record<MenuItem["tag"], string> = {
  hot: "☕ Hot",
  cold: "🧊 Cold",
  food: "🍰 Food",
};

const tagColor: Record<MenuItem["tag"], string> = {
  hot: "#c2410c",
  cold: "#0369a1",
  food: "#7c3aed",
};

export default function App() {
  const [filter, setFilter] = useState<MenuItem["tag"] | "all">("all");

  const items: MenuItem[] = [
    { name: "Chai Latte", price: 520, desc: "スパイス薫る本格チャイ", tag: "hot" },
    { name: "Hojicha Latte", price: 480, desc: "焙じ茶の香ばしいラテ", tag: "hot" },
    { name: "Drip Coffee", price: 400, desc: "シングルオリジンの日替わり", tag: "hot" },
    { name: "Cold Brew", price: 500, desc: "12時間かけた水出しコーヒー", tag: "cold" },
    { name: "Yuzu Soda", price: 480, desc: "自家製柚子シロップのソーダ", tag: "cold" },
    { name: "Lemon Squash", price: 450, desc: "瀬戸内レモンの爽やかスカッシュ", tag: "cold" },
    { name: "Scone Set", price: 650, desc: "自家製スコーン＋お好きなドリンク", tag: "food" },
    { name: "Tiramisu", price: 580, desc: "マスカルポーネの濃厚ティラミス", tag: "food" },
  ];

  const filtered = filter === "all" ? items : items.filter((m) => m.tag === filter);
  const tags = ["all", "hot", "cold", "food"] as const;

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#f8f5f0", minHeight: "100vh", color: "#1c1917" }}>
      <header style={{
        background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)",
        color: "#fff", padding: "52px 24px", textAlign: "center",
      }}>
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ margin: "0 auto 14px" }}>
          <rect x="3" y="3" width="50" height="50" rx="25" stroke="#93c5fd" strokeWidth="2" fill="none" />
          <path d="M18 22c0 8 5 14 10 14s10-6 10-14" stroke="#93c5fd" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M38 22c2.5 0 5 1.5 5 4s-2.5 4-5 4" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" fill="none" />
          <line x1="23" y1="18" x2="23" y2="13" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <line x1="28" y1="16" x2="28" y2="10" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <line x1="33" y1="18" x2="33" y2="13" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
        <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Sora Coffee</h1>
        <p style={{ opacity: 0.8, marginTop: 8, fontSize: 14 }}>空の下で、ゆったりと一杯を</p>
      </header>

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "28px 24px" }}>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24 }}>
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              style={{
                padding: "6px 18px", borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: "pointer",
                border: filter === t ? "1.5px solid #2563eb" : "1.5px solid #d6d3d1",
                background: filter === t ? "#2563eb" : "#fff",
                color: filter === t ? "#fff" : "#78716c",
                transition: "all 0.2s",
              }}
            >
              {t === "all" ? "All" : tagLabel[t]}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((item) => (
            <div key={item.name} style={{
              background: "#fff", border: "1px solid #e7e5e4", borderRadius: 10,
              padding: "14px 16px", transition: "box-shadow 0.15s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</span>
                  <span style={{
                    marginLeft: 8, fontSize: 10, fontWeight: 600, padding: "2px 8px",
                    borderRadius: 10, background: `${tagColor[item.tag]}15`, color: tagColor[item.tag],
                  }}>
                    {tagLabel[item.tag]}
                  </span>
                </div>
                <span style={{ fontWeight: 700, color: "#2563eb", fontSize: 14 }}>¥{item.price}</span>
              </div>
              <p style={{ fontSize: 12, color: "#a8a29e", marginTop: 4 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ textAlign: "center", padding: "32px", fontSize: 11, color: "#a8a29e" }}>
        <p>Open 10:00 - 20:00 / Open Daily</p>
      </footer>
    </div>
  );
}
