import React from "react";
import ApplicationListDataTable from "./LeaveRequestComponentTable";
import CardComponent from "../../components/CardComponent";
import { Button, Stack } from "@mui/material";

export default function LeaveRequestComponent() {
  return (
    <>
      <CardComponent title={"休暇取得一覧"} bgColor="#C5FF95">
        <Stack direction={"row"} spacing={1}>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            href="/leaveRequest"
          >
            休暇申請
          </Button>
        </Stack>
        <ApplicationListDataTable />
      </CardComponent>
    </>
  );
}
