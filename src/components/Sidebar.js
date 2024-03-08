import React from "react";
import { SidebarData } from "./SidebarData";
import SidebarIcon from "./SidebarIcon";
import "../css/Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarIcon />
      <ul className="sidebarList">
        {SidebarData.map((value, key) => {
          return (
            <li
              key={key}
              id={window.location.pathname === value.link ? "active" : ""}
              className="row"
              onClick={() => {
                if(value.onClick) {
                  
                }
                window.location.pathname = value.link;
              }}
            >
              <div id="icon">{value.icon}</div>
              <div id="title">{value.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
