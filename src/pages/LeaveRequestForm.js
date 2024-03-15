import React, { useRef, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar.js";
import "../css/LeaveRequestForm.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import LeaveRequestConfirmDialog from "../components/Dialog/LeaveRequestConfirmDialog";
import { Card, CardContent } from "@mui/material";
import { Stack } from "@mui/system";

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
      <Card sx={{ width: "60%", margin: "auto", padding: "4px" }}>
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            申請フォーム
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            gutterBottom
            sx={{ marginLeft: "20px" }}
          >
            *は必須入力
          </Typography>
        </CardContent>
        <CardContent>
          <Stack spacing={2} direction="row">
            <TextField
              required
              label="申請者"
              variant="outlined"
              size="small"
              margin="normal"
              inputRef={paidLeaveReasonRef}
              onChange={handleChenge}
              fullWidth
            />
          </Stack>
          <Stack direction="row">
            <TextField
              select
              required
              size="small"
              label="休暇種類"
              defaultValue="有休休暇"
              variant="outlined"
              margin="normal"
              inputRef={paidLeaveReasonRef}
              onChange={handleChenge}
            >
              {leaveRequestType.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction="row">
            <TextField
              required
              label="休暇取得日"
              type="date"
              size="small"
              margin="normal"
              variant="outlined"
              helperText="休暇取得日を入力してください"
              inputRef={acquisitionStartDateRef}
              onChange={handleChenge}
            />
          </Stack>
          <Stack direction="row">
            <TextField
              required
              label="申請理由"
              size="small"
              variant="outlined"
              fullWidth
              margin="normal"
              inputRef={leaveReasonRef}
              onChange={handleChenge}
            />
          </Stack>

          <Stack direction="row">
            <TextField
              label="備考"
              size="small"
              variant="outlined"
              fullWidth
              margin="normal"
              // helperText="申請理由を入力してください"
              inputRef={leaveReasonRef}
              onChange={handleChenge}
            />
          </Stack>

          <Typography variant="body2" sx={{ mb: 1 }}>
            {/* {errorMessage} */}
          </Typography>
          <LeaveRequestConfirmDialog leaveRequestRef={leaveRequestRef} />
        </CardContent>
      </Card>
    </div>
  );
}
