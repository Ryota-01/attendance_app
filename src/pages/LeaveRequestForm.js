import React, { useRef, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar.js";
import "../css/LeaveRequestForm.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import LeaveRequestConfirmDialog from "../components/Dialog/LeaveRequestConfirmDialog";
import { Box, Stack } from "@mui/system";
import { Card, CardContent, Divider, Grid } from "@mui/material";

export default function LeaveRequestForm() {
  const [leaveRequestRef, setLeaveRequestRef] = useState();
  const paidLeaveReasonRef = useRef(); //有給休暇かその他特別休暇か
  const acquisitionStartDateRef = useRef(); //取得日
  const leaveReasonRef = useRef(); //申請理由
  const padding = {
    padding: "18px",
  };
  const spacing = 4;
  const xs = 6;
  const varient = "filled";

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
    <div>
      <Sidebar />
      {/* <LeaveRequestConfirmDialog /> */}
      {/* <ResponsiveAppBar /> */}
      <Card sx={{ width: "72%", margin: "auto", padding: "24px"}}>
        <CardContent>
          <Box marginBottom={"12px"}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              休暇申請
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              *は必須入力
            </Typography>
            <Divider />
          </Box>
          <Grid container spacing={spacing} sx={{ padding: padding }}>
            <Grid item xs={xs}>
              <TextField
                required
                label="申請者"
                helperText="名前を入力してください"
                variant={varient}
                size="small"
                inputRef={paidLeaveReasonRef}
                onChange={handleChenge}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={spacing} sx={{ padding: padding }}>
            <Grid item xs={xs}>
              <TextField
                select
                required
                size="small"
                label="休暇種類"
                defaultValue="有休休暇"
                helperText="休暇種別を選択してください"
                variant={varient}
                inputRef={paidLeaveReasonRef}
                onChange={handleChenge}
                fullWidth
              >
                {leaveRequestType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid container spacing={spacing} sx={{ padding: padding }}>
            <Grid item xs={xs}>
              <TextField
                required
                label="休暇開始日"
                type="date"
                size="small"
                variant={varient}
                helperText="開始日を入力してください"
                inputRef={acquisitionStartDateRef}
                onChange={handleChenge}
                fullWidth
              />
            </Grid>
            <Grid item xs={xs}>
              <TextField
                required
                label="休暇終了日"
                type="date"
                size="small"
                variant={varient}
                helperText="終了日を入力してください"
                inputRef={acquisitionStartDateRef}
                onChange={handleChenge}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={spacing} sx={{ padding: padding }}>
            <Grid item xs={xs}>
              <TextField
                required
                label="申請理由"
                helperText="申請理由を入力してください"
                size="small"
                variant={varient}
                fullWidth
                inputRef={leaveReasonRef}
                onChange={handleChenge}
              />
            </Grid>
          </Grid>
          <Grid container spacing={spacing} sx={{ padding: padding }}>
            <Grid item xs={xs}>
              <TextField
                label="備考"
                size="small"
                helperText="備考を入力してください（任意）"
                variant={varient}
                fullWidth
                inputRef={leaveReasonRef}
                onChange={handleChenge}
              />
            </Grid>
          </Grid>
          <Grid container spacing={spacing} sx={{ padding: padding }}>
            <Grid item xs={xs}>
              <LeaveRequestConfirmDialog leaveRequestRef={leaveRequestRef} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
