import React from "react";
import CardComponent from "./CardComponent";
import LeaveConutDataTable from "./Table/LeaveConutDataTable";
import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function LeaveConutComponent(props) {
  return (
    <>
      <Card sx={{ position: "relative" }}>
        <Typography
          variant="h5"
          sx={{
            width: "100%",
            bgcolor: "gray",
            position: "absolute",
            top: "80px",
          }}
          color={"white"}
          fontWeight={"bold"}
          textAlign={"center"}
          padding={1}
        >
          開発中...
        </Typography>
        <Box sx={{ bgcolor: "dimGray", opacity: 0.2 }}>
          <CardComponent title={"休暇残日数"}>
            <LeaveConutDataTable />
          </CardComponent>
        </Box>
      </Card>
    </>
  );
}
