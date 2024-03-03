import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SendIcon from '@mui/icons-material/Send';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export const SidebarData = [
  {
    title : "ホーム",
    icon : <HomeOutlinedIcon />,
    link : "/home",
  },
  {
    title : "打刻",
    icon : <AccessTimeIcon />,
    link : "/attendance",
  },
  {
    title : "勤怠一覧",
    icon : <SummarizeIcon />,
    link : "/attendancelist",
  },
  {
    title : "休暇申請",
    icon : <SendIcon />,
    link : "/leaverequest",
  },
  {
    title : "ユーザー情報",
    icon : <PermIdentityIcon />,
    link : "/userinfo",
  },
  {
    title : "ログアウト",
    icon : <LogoutOutlinedIcon />,
    link : "/logout",
  },
];