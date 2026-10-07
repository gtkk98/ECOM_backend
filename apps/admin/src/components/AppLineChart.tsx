import Icon from "./Icon";
import Panel from "./Panel";

export default function AppLineChart() {
  return <Panel className="chart-panel">
    <div className="panel-heading"><div><h2>Customer growth</h2><p>New customers acquired each month.</p></div><button className="select-button"><Icon name="calendar" size={15} />This year<span>⌄</span></button></div>
    <div className="small-chart-caption"><strong>846</strong><span>active customers</span><span className="trend">↗ 18.4%</span></div>
    <div className="line-chart"><div className="line-y-axis"><span>200</span><span>150</span><span>100</span><span>50</span><span>0</span></div><div className="line-plot">
      <div className="line-grid">{[0, 1, 2, 3, 4].map((i) => <i key={i} />)}</div>
      <svg viewBox="0 0 460 150" preserveAspectRatio="none" role="img" aria-label="Customer growth trending upward">
        <path d="M0 120 C30 110 44 115 68 99 S108 102 138 82 S170 94 198 72 S238 80 266 60 S307 72 334 49 S372 65 400 31 S436 42 460 15" fill="none" stroke="#7258e8" strokeWidth="3" vectorEffect="non-scaling-stroke" />
        {[[68, 99], [138, 82], [198, 72], [266, 60], [334, 49], [400, 31], [460, 15]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="4" fill="white" stroke="#7258e8" strokeWidth="2" vectorEffect="non-scaling-stroke" />)}
      </svg>
      <div className="line-x-axis"><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span></div>
    </div></div>
  </Panel>;
}
