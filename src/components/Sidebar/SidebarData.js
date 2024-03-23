import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SummarizeIcon from "@mui/icons-material/Summarize";
import SendIcon from "@mui/icons-material/Send";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

export const SidebarData = [
  {
    title: "ホーム",
    link: "/home",
    icon: <HomeOutlinedIcon />,
  },
  {
    title: "勤怠一覧",
    link: "/attendancelist",
    icon: <SummarizeIcon />,
  },
  {
    title: "休暇申請",
    link: "/leaverequest",
    icon: <SendIcon />,
  },
  {
    title: "社員情報作成",
    link: "/createuserinfo",
    icon: <PermIdentityIcon />,
    roles: ["admin"],
  },
];
