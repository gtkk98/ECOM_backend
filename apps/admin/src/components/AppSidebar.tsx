import type { Section } from "./adminTypes";
import Icon from "./Icon";
import { Tooltip } from "./ui/tooltip";

const navigation: { label: Section; icon: string; badge?: string }[] = [
  { label: "Overview", icon: "grid" },
  { label: "Products", icon: "box", badge: "24" },
  { label: "Orders", icon: "receipt", badge: "8" },
  { label: "Customers", icon: "users" },
  { label: "Categories", icon: "layers" },
  { label: "Analytics", icon: "chart" },
  { label: "Tasks", icon: "check" },
];

export default function AppSidebar({ active, onNavigate, mobileOpen, onClose }: {
  active: Section;
  onNavigate: (section: Section) => void;
  mobileOpen: boolean;
  onClose: () => void;
}) {
  return <>
    {mobileOpen && <button aria-label="Close navigation" className="sidebar-scrim" onClick={onClose} />}
    <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
      <a className="brand" href="#" onClick={(event) => { event.preventDefault(); onNavigate("Overview"); }}>
        <span className="brand-mark">c<span>.</span></span><span className="brand-name">chow<span>up</span><small>ADMIN CONSOLE</small></span>
      </a>
      <div className="workspace-switch"><div className="workspace-logo">C</div><div><strong>ChowUp Kitchen</strong><small>Pro plan</small></div><span className="workspace-caret">⌄</span></div>
      <div className="nav-label">WORKSPACE</div>
      <nav className="side-nav" aria-label="Main navigation">
        {navigation.map((item) => <button key={item.label} onClick={() => { onNavigate(item.label); onClose(); }} className={`nav-item ${active === item.label ? "nav-active" : ""}`}>
          <Icon name={item.icon} /><span>{item.label}</span>{item.badge && <span className="nav-badge">{item.badge}</span>}
        </button>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="help-card"><span className="help-spark">✳</span><strong>Need a hand?</strong><p>Visit our help center for tips and answers.</p><button onClick={() => window.alert("Help center: support@chowup.com")}>Visit help center <Icon name="arrow" size={14} /></button></div>
        <Tooltip content="Manage your store preferences"><button className="nav-item settings-button" onClick={() => window.alert("Settings are coming soon.")}><span className="settings-icon">⚙</span><span>Settings</span></button></Tooltip>
        <div className="profile-mini"><div className="avatar avatar-lilac">JD</div><div className="profile-info"><strong>Jamie Davis</strong><small>Store owner</small></div><button aria-label="Account options" className="icon-button"><Icon name="dots" /></button></div>
      </div>
    </aside>
  </>;
}
