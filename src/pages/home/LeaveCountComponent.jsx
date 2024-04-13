import React from "react";
import { Card } from "@mui/material";
import { Box } from "@mui/system";
import CardComponent from "../../components/CardComponent";
import LeaveConutDataTable from "./LeaveCountComponentTable";

export default function LeaveCountComponent(props) {
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
