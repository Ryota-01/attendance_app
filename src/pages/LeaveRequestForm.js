import React, { useRef, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar.js";
import "../css/LeaveRequestForm.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import LeaveRequestConfirmDialog from "../components/Dialog/LeaveRequestConfirmDialog";
import { Card } from "@mui/material";

export default function LeaveRequestForm() {
  const [leaveRequestRef, setLeaveRequestRef] = useState();
  const paidLeaveReasonRef = useRef(); //有給休暇かその他特別休暇か
  const acquisitionStartDateRef = useRef(); //取得日
  const leaveReasonRef = useRef(); //申請理由
  const leaveRequestType = [
    {
      value: "有休休暇",
      label: "有休休暇",
    },
    {
      value: "特別休暇(代休)",
      label: "特別休暇(代休)",
    },
  ];

  const handleChenge = (e) => {
    const value = {
      paidLeaveReason: paidLeaveReasonRef.current.value,
      acquisitionStartDate: acquisitionStartDateRef.current.value,
      leaveReason: leaveReasonRef.current.value,
    };
    setLeaveRequestRef(value);
  };
  return (
    <div className="wrapper">
      <Sidebar />
      {/* <LeaveRequestConfirmDialog /> */}
      <div className="leaveRequestForm">
        <Card sx={{ width: "80%", margin: "auto", padding: "30px" }}>
          <Typography variant="h5" gutterBottom>
            休暇申請フォーム
          </Typography>
          <TextField
            select
            required
            label="休暇種類"
            defaultValue="有休休暇"
            variant="outlined"
            margin="normal"
            helperText="休暇の種類を選択してください"
            inputRef={paidLeaveReasonRef}
            onChange={handleChenge}
          >
            {leaveRequestType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            label="休暇取得日"
            type="date"
            variant="filled"
            margin="normal"
            helperText="休暇取得日を入力してください"
            inputRef={acquisitionStartDateRef}
            onChange={handleChenge}
          />
          <TextField
            required
            label="申請理由"
            variant="filled"
            helperText="申請理由を入力してください"
            margin="normal"
            inputRef={leaveReasonRef}
            onChange={handleChenge}
          />
          <Typography variant="body2" sx={{ mb: 1 }}>
            {/* {errorMessage} */}
          </Typography>
          <LeaveRequestConfirmDialog leaveRequestRef={leaveRequestRef} />
        </Card>
      </div>
    </div>
  );
}
