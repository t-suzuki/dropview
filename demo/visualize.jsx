// スギ花粉データ — 時系列の推移を折れ線グラフで可視化
// 方向性: 「いつピークが来たか？」時間軸で飛散量の急増を捉える

export default function App() {
  const [selected, setSelected] = useState(new Set(["千代田", "青梅", "八王子"]));
  const [hoveredDay, setHoveredDay] = useState(null);

  const stations = ["千代田", "葛飾", "杉並", "北", "大田", "青梅", "八王子", "多摩", "町田", "立川", "府中", "小平"];
  const colors = ["#ef4444","#f97316","#eab308","#22c55e","#06b6d4","#3b82f6","#8b5cf6","#ec4899","#14b8a6","#f43f5e","#6366f1","#a855f7"];

  const dates = ["2/13","2/14","2/15","2/16","2/17","2/18","2/19","2/20","2/21","2/22","2/23","2/24","2/25","2/26","2/27","2/28","3/1","3/2"];

  const data = {
    "千代田": [0,2.5,9.9,4.3,0.9,3.1,3.1,1.5,34.6,125.9,143.8,152.8,12.3,49.4,117.9,232.4,135.8,179.9],
    "葛飾":   [0,1.9,9.3,4.0,0.3,1.5,3.1,1.9,21.6,66.7,172.5,198.5,8.6,120.4,120.1,289.5,109.6,117.6],
    "杉並":   [0.6,3.1,7.7,6.8,1.5,2.5,2.5,1.5,66.7,96.9,196.0,154.6,9.0,61.1,104.0,278.1,151.2,99.4],
    "北":     [0,1.9,3.4,1.5,0.9,0.3,1.2,4.6,16.0,72.5,149.7,165.4,15.7,82.4,146.0,231.5,103.1,118.2],
    "大田":   [0.6,2.8,11.4,5.6,0.3,1.9,1.9,5.2,22.8,116.4,184.0,168.5,9.0,80.6,108.6,288.3,108.3,104.9],
    "青梅":   [2.7,2.7,2.7,28.1,4.0,42.9,34.0,263.3,263.3,263.3,263.3,166.7,1.5,57.7,3986.0,3986.0,3986.0,102.2],
    "八王子": [3.1,3.1,3.1,17.0,1.5,11.7,21.9,75.5,75.5,75.5,75.5,62.0,0.6,43.5,948.5,948.5,948.5,114.2],
    "多摩":   [2.1,2.1,2.1,4.3,1.9,8.0,10.8,85.7,85.7,85.7,85.7,112.3,4.0,49.1,856.1,856.1,856.1,166.0],
    "町田":   [4.9,4.9,4.9,3.4,0.6,3.7,4.9,94.8,94.8,94.8,94.8,130.2,7.7,22.2,798.7,798.7,798.7,156.5],
    "立川":   [3.2,3.2,3.2,10.8,0.9,19.1,6.2,26.2,26.2,26.2,26.2,217.6,4.9,89.8,1567.6,1567.6,1567.6,74.1],
    "府中":   [2.4,2.4,2.4,3.1,1.2,17.0,4.9,43.3,43.3,43.3,43.3,210.8,2.8,18.8,153.4,153.4,153.4,47.8],
    "小平":   [1.7,1.7,1.7,4.6,0.6,0.6,1.2,95.4,95.4,95.4,95.4,73.8,3.1,15.7,771.0,771.0,771.0,71.3],
  };

  const toggle = (s) => {
    const next = new Set(selected);
    next.has(s) ? next.delete(s) : next.add(s);
    setSelected(next);
  };

  // Use log scale for better visibility
  const maxVal = 500;
  const W = 700, H = 320, PL = 50, PR = 20, PT = 20, PB = 40;
  const cw = W - PL - PR, ch = H - PT - PB;

  const toX = (i) => PL + (i / (dates.length - 1)) * cw;
  const toY = (v) => PT + ch - (Math.min(v, maxVal) / maxVal) * ch;

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", background: "#fafafa", minHeight: "100vh", color: "#18181b" }}>
      <header style={{ background: "linear-gradient(135deg, #991b1b 0%, #dc2626 100%)", color: "#fff", padding: "36px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>🌲 東京都スギ花粉 飛散推移</h1>
        <p style={{ opacity: 0.8, fontSize: 13, marginTop: 6 }}>2025年 2月〜3月 — 日別飛散量の時系列比較</p>
      </header>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px" }}>
        {/* Legend */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 12px", justifyContent: "center", marginBottom: 20 }}>
          {stations.map((s, i) => (
            <button key={s} onClick={() => toggle(s)} style={{
              display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 14,
              border: selected.has(s) ? `2px solid ${colors[i]}` : "1px solid #d4d4d8",
              background: selected.has(s) ? `${colors[i]}12` : "#fff",
              fontSize: 12, fontWeight: selected.has(s) ? 600 : 400, cursor: "pointer",
              color: selected.has(s) ? colors[i] : "#a1a1aa", transition: "all 0.15s",
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: colors[i] }} />
              {s}
            </button>
          ))}
        </div>

        {/* Chart */}
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb" }}>
          {/* Y gridlines */}
          {[0, 100, 200, 300, 400, 500].map(v => (
            <g key={v}>
              <line x1={PL} y1={toY(v)} x2={W - PR} y2={toY(v)} stroke="#f4f4f5" strokeWidth="1" />
              <text x={PL - 6} y={toY(v) + 4} textAnchor="end" fontSize="10" fill="#a1a1aa">{v}</text>
            </g>
          ))}
          {/* X labels */}
          {dates.map((d, i) => (
            <text key={d} x={toX(i)} y={H - 8} textAnchor="middle" fontSize="9" fill="#a1a1aa">{d}</text>
          ))}
          {/* Hover column */}
          {hoveredDay !== null && (
            <rect x={toX(hoveredDay) - 8} y={PT} width={16} height={ch} fill="#3b82f620" rx="4" />
          )}
          {/* Lines */}
          {stations.map((s, si) => {
            if (!selected.has(s)) return null;
            const pts = data[s].map((v, i) => `${toX(i)},${toY(v)}`).join(" ");
            return <polyline key={s} points={pts} fill="none" stroke={colors[si]} strokeWidth="2" strokeLinejoin="round" />;
          })}
          {/* Hover dots */}
          {hoveredDay !== null && stations.map((s, si) => {
            if (!selected.has(s)) return null;
            const v = data[s][hoveredDay];
            return <circle key={s} cx={toX(hoveredDay)} cy={toY(v)} r="4" fill={colors[si]} stroke="#fff" strokeWidth="1.5" />;
          })}
          {/* Invisible hover rects */}
          {dates.map((_, i) => (
            <rect key={i} x={toX(i) - cw / dates.length / 2} y={PT} width={cw / dates.length} height={ch}
              fill="transparent" onMouseEnter={() => setHoveredDay(i)} onMouseLeave={() => setHoveredDay(null)} />
          ))}
          <text x={PL} y={PT - 6} fontSize="10" fill="#a1a1aa">個/cm²（500以上は上限でクリップ）</text>
        </svg>

        {/* Hover tooltip */}
        {hoveredDay !== null && (
          <div style={{ marginTop: 12, padding: "12px 16px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{dates[hoveredDay]}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px" }}>
              {stations.filter(s => selected.has(s)).map((s, i) => (
                <span key={s} style={{ fontSize: 12, color: colors[stations.indexOf(s)] }}>
                  {s}: <b>{data[s][hoveredDay].toLocaleString()}</b>
                </span>
              ))}
            </div>
          </div>
        )}

        <p style={{ fontSize: 11, color: "#a1a1aa", textAlign: "center", marginTop: 16 }}>
          出典: 東京都福祉保健局「東京都のスギ花粉飛散データ」
        </p>
      </div>
    </div>
  );
}
