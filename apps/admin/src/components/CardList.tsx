export default function CardList() {
  const cards = [
    { title: "Total revenue", value: "$48,294", change: "+12.8%", icon: "↗", tone: "violet", note: "vs. last month" },
    { title: "Total orders", value: "1,284", change: "+8.2%", icon: "▤", tone: "orange", note: "vs. last month" },
    { title: "Active customers", value: "846", change: "+18.4%", icon: "♙", tone: "blue", note: "vs. last month" },
    { title: "Avg. order value", value: "$37.61", change: "-2.4%", icon: "⌁", tone: "green", note: "vs. last month", negative: true },
  ];
  return <div className="stats-grid">{cards.map((card) => <article className="stat-card" key={card.title}>
    <div className={`stat-icon ${card.tone}`}>{card.icon}</div><span className="stat-title">{card.title}</span><strong className="stat-value">{card.value}</strong>
    <div className="stat-foot"><span className={`trend ${card.negative ? "trend-down" : ""}`}>{card.negative ? "↘" : "↗"} {card.change}</span><span>{card.note}</span></div>
  </article>)}</div>;
}
