import { Card, CardContent, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import DigitalClock from "../components/DigitalClock";
import AttendanceButton from "../components/AttendanceButton";

export default function AttendanceFormComponent() {
  return (
    <>
      <Card
        sx={{
          padding: "12px",
          height: "340px",
        }}
      >
        <CardContent>
          <Box marginBottom={"12px"}>
            <Typography
              variant="h6"
              color="text.secondary"
              gutterBottom
              fontWeight={"bold"}
            >
              打刻
            </Typography>
            <Divider />
            <Box sx={{ marginTop: "24px" }}>
              <DigitalClock />
              <AttendanceButton />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
