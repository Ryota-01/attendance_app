import React from "react";
import { SidebarData } from "./SidebarData";
import { useState } from "react";
import SidebarIcon from "./SidebarIcon";
import "../css/Sidebar.css";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemButton } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { auth } from "../firebase";

export default function Sidebar() {
  const navigate = useNavigate("");
  const [open, setOpen] = useState("");
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <Button onClick={toggleDrawer(true)} sx={{ color: "black" }}>
        <MenuIcon sx={{ fontSize: "2.5rem" }} />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, height: "100%", background: "#24292E" }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            <SidebarIcon />
            {SidebarData.map((value, key) => (
              <ListItem disablePadding key={key}>
                <ListItemButton component={Link} to={value.link}>
                  <ListItemIcon sx={{ color: "white" }}>
                    {value.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={value.title}
                    primaryTypographyProps={{
                      color: "white",
                      fontWeight: "medium",
                      variant: "body2",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "white" }}>
                  <LogoutOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"ログアウト"}
                  onClick={handleLogout}
                  primaryTypographyProps={{
                    color: "white",
                    fontWeight: "medium",
                    variant: "body2",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
