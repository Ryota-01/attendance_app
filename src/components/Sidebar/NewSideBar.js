import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InboxIcon from "@mui/icons-material/Inbox";
import { ListItemIcon } from "@mui/material";
import { SidebarData } from "./SidebarData";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const boxStyles = {
  width: "100%",
  height: "100vh",
  maxWidth: "100%",
  bgcolor: "#24292E",
  color: "white",
  position:"sticky",
  top:0
};

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: { xs: "none", sm: "block" }, width:60 }}>
      <Box sx={boxStyles}>
        <nav aria-label="main mailbox folders">
          <List disablePadding>
            {SidebarData.map((value, key) => {
              return (
                <ListItemButton key={key} sx={{ color: "white" }} to={value.link}>
                  <ListItemIcon sx={{ color: "white", margin:"auto", height:40, alignItems:"center", minWidth:"unset" }}>
                    {value.icon}
                  </ListItemIcon>
                </ListItemButton>
              );
            })}
          </List>
        </nav>
      </Box>
    </Box>
  );
}
