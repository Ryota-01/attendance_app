import React from "react";
import CardComponent from "./CardComponent";
import LeaveConutDataTable from "./Table/LeaveCountDataTable";
import { Button, Card, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function LeaveConutComponent(props) {
  return (
    <>
      <Card sx={{ position: "relative" }}>
        <Box>
          <CardComponent title={"休暇残日数"}>
            <LeaveConutDataTable />
          </CardComponent>
        </Box>
      </Card>
    </>
  );
}
