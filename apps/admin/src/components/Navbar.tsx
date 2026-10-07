"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import type { Section } from "./adminTypes";
import Icon from "./Icon";

export default function Navbar({ active, onMenu, search, onSearch }: {
  active: Section;
  onMenu: () => void;
  search: string;
  onSearch: (value: string) => void;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return <header className="topbar">
    <button className="mobile-menu icon-button" onClick={onMenu} aria-label="Open navigation"><Icon name="menu" /></button>
    <div className="breadcrumbs"><span>Workspace</span><Icon name="chevron" size={14} /><strong>{active}</strong></div>
    <div className="topbar-tools">
      <label className="global-search"><Icon name="search" size={17} /><input aria-label="Search dashboard" placeholder="Search anything..." value={search} onChange={(event) => onSearch(event.target.value)} /><kbd>⌘ K</kbd></label>
      <button className="icon-button theme-toggle" aria-label={mounted && resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"} title={mounted && resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"} onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>{mounted && resolvedTheme === "dark" ? "☼" : "☾"}</button>
      <button className="icon-button notification-button" aria-label="Notifications" onClick={() => window.alert("You're all caught up!")}><Icon name="bell" /><i /></button>
      <div className="topbar-divider" />
      <div className="avatar avatar-lilac top-avatar">JD</div>
    </div>
  </header>;
}
