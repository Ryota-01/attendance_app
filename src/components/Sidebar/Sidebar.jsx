import React, { useEffect } from "react";
import { SidebarData } from "./SidebarData";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Divider, Grid, ListItemButton, Typography } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { auth, db } from "../../firebase";
import { useAuthContext } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";

export default function Sidebar(roles) {
  const navigate = useNavigate("");
  const { user } = useAuthContext();
  const [open, setOpen] = useState("");
  const [admin, setAdmin] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    auth.signOut();
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        //usersコレクションから、認証（ログイン）中のIDと一致するドキュメントを取得。
        const userDocumentRef = doc(db, "users", user.uid);
        //ドキュメントの存在確認。
        const userDocumentSnapshot = await getDoc(userDocumentRef);
        console.log(userDocumentSnapshot.data().admin);
        setAdmin(userDocumentSnapshot.data().admin);
      } catch (e) {
        console.log("データの取得に失敗しました", e.message);
      }
    };
    fetchUserData();
  }, [user]);

  return (
    <Box sx={{ display: { xs: "block", sm: "none", md: "none" } }}>
      <Button onClick={toggleDrawer(true)} sx={{ color: "black" }}>
        <MenuIcon sx={{ fontSize: "2.5rem" }} />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: "270px", height: "100%", background: "#3F4D67" }}
          // role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            {SidebarData.map((value, key) => (
              <ListItem>
                <ListItemButton>
                  <ListItemIcon>{value.icon}</ListItemIcon>
                  <ListItemText primary={value.title} color="white"/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                {/* <ListItemIcon sx={{ color: "white" }}>
                  <LogoutOutlinedIcon />
                </ListItemIcon> */}
                <ListItemText
                  primary={"ログアウト"}
                  onClick={handleLogout}
                  primaryTypographyProps={{
                    color: "white",
                    fontWeight: "bold",
                    variant: "body2",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
