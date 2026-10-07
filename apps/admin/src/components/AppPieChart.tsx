import Icon from "./Icon";
import Panel from "./Panel";

export default function AppPieChart() {
  return <Panel className="chart-panel">
    <div className="panel-heading"><div><h2>Best-selling categories</h2></div><button className="select-button"><Icon name="calendar" size={15} />This month<span>⌄</span></button></div>
    <div className="pie-layout"><div className="pie-graphic" role="img" aria-label="Category sales: Burgers 38%, Pizza 28%, Sides 19%, Drinks 15%"><div className="pie-center"><strong>1,284</strong><span>items sold</span></div></div><div className="pie-legend"><div><i className="legend-dot legend-purple" /><span>Burgers</span><b>38%</b></div><div><i className="legend-dot legend-orange" /><span>Pizza</span><b>28%</b></div><div><i className="legend-dot legend-blue" /><span>Sides</span><b>19%</b></div><div><i className="legend-dot legend-green" /><span>Drinks</span><b>15%</b></div></div></div>
  </Panel>;
}
