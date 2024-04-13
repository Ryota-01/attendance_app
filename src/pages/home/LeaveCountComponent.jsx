import React from "react";
import { Box, Card } from "@mui/material";
import LeaveConutDataTable from "./LeaveCountComponentTable";
import CardComponent from "../../components/CardComponent";

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
