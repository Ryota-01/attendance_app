import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SendIcon from '@mui/icons-material/Send';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

export const SidebarData = [
  
  {
    title : "ホーム",
    icon : <HomeOutlinedIcon fontSize='small'/>,
    link : "/home",
  },
  {
    title : "打刻",
    icon : <AccessTimeIcon  fontSize='small'/>,
    link : "/attendance",
  },
  {
    title : "勤怠一覧",
    icon : <SummarizeIcon  fontSize='small'/>,
    link : "/attendancelist",
  },
  {
    title : "休暇申請",
    icon : <SendIcon  fontSize='small'/>,
    link : "/leaverequest",
  },
  {
    title : "申請一覧",
    icon : <SummarizeIcon  fontSize='small'/>,
    link : "/applicationList",
  },
  {
    title : "ユーザー情報",
    icon : <PermIdentityIcon  fontSize='small'/>,
    link : "/userinfo",
  },
];