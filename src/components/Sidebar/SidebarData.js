import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SendIcon from '@mui/icons-material/Send';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

export const SidebarData = [
  {
    title : "ホーム",
    link : "/home",
  },
  {
    title : "打刻",
    link : "/attendance",
  },
  {
    title : "勤怠一覧",
    link : "/attendancelist",
  },
  {
    title : "休暇申請",
    link : "/leaverequest",
  },
  {
    title : "申請一覧",
    link : "/applicationList",
  },
  {
    title : "社員情報作成",
    link : "/createuserinfo",
    roles: ["admin"]
  },
  {
    title : "プロフィール",
    link : "/userinfo",
  },
];