import Icon from "./Icon";
import Panel from "./Panel";

export default function AppAreaChart() {
  return <Panel className="chart-panel">
    <div className="panel-heading"><div><h2>Revenue over time</h2><p>Track your store&apos;s revenue performance.</p></div><button className="select-button"><Icon name="calendar" size={15} />Last 7 days<span>⌄</span></button></div>
    <div className="chart-legend"><span><i className="legend-dot legend-purple" />Revenue</span><span><i className="legend-dot legend-gray" />Previous period</span><b>+$4,280.00 <small>↗ 12.8%</small></b></div>
    <div className="area-chart"><div className="y-axis"><span>$8k</span><span>$6k</span><span>$4k</span><span>$2k</span><span>$0</span></div><div className="plot">
      <div className="gridlines"><i /><i /><i /><i /><i /></div>
      <svg viewBox="0 0 650 190" preserveAspectRatio="none" role="img" aria-label="Revenue increased through the week, peaking on Sunday">
        <defs><linearGradient id="revenue-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#7157e8" stopOpacity=".19" /><stop offset="100%" stopColor="#7157e8" stopOpacity="0" /></linearGradient></defs>
        <path d="M0,135 C35,122 40,112 76,118 S122,143 152,126 S204,93 228,105 S274,111 304,82 S352,91 380,67 S426,87 456,60 S502,79 532,45 S580,61 608,26 S635,44 650,14 L650,190 L0,190Z" fill="url(#revenue-fill)" />
        <path d="M0,135 C35,122 40,112 76,118 S122,143 152,126 S204,93 228,105 S274,111 304,82 S352,91 380,67 S426,87 456,60 S502,79 532,45 S580,61 608,26 S635,44 650,14" fill="none" stroke="#7357e8" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        <path d="M0,157 C45,152 62,160 92,150 S145,165 184,148 S220,160 252,145 S300,153 340,143 S385,152 420,136 S470,149 502,130 S550,143 585,125 S625,133 650,116" fill="none" stroke="#cfd1dc" strokeWidth="2" strokeDasharray="5 6" vectorEffect="non-scaling-stroke" />
        <circle cx="608" cy="26" r="5" fill="#fff" stroke="#7357e8" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="x-axis"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
    </div></div>
  </Panel>;
}
