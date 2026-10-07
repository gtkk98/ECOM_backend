import Icon from "./Icon";
import Panel from "./Panel";

export default function AppBarChart() {
  const bars = [35, 55, 42, 72, 48, 87, 66, 58, 78, 52, 91, 68];
  return <Panel className="chart-panel">
    <div className="panel-heading"><div><h2>Orders by channel</h2></div><button className="select-button"><Icon name="calendar" size={15} />This month<span>⌄</span></button></div>
    <div className="small-chart-caption"><strong>1,284</strong><span>total orders</span><span className="trend">↗ 8.2%</span></div>
    <div className="bar-chart"><div className="bar-y-axis"><span>200</span><span>150</span><span>100</span><span>50</span><span>0</span></div><div className="bar-plot"><div className="bar-grid">{[0, 1, 2, 3, 4].map((i) => <i key={i} />)}</div><div className="bars">{bars.map((height, i) => <div key={i} className="bar-wrap"><i className={`bar ${i === 10 ? "bar-highlight" : ""}`} style={{ height: `${height}%` }} /><span>{["W1", "W2", "W3", "W4"][i % 4]}</span></div>)}</div></div></div>
    <div className="channel-legend"><span><i className="legend-dot legend-purple" />Online <b>72%</b></span><span><i className="legend-dot legend-orange" />In-store <b>28%</b></span></div>
  </Panel>;
}
