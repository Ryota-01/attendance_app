import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

function CardComponent(props) {
  const children = props.children;
  const title = props.title;
  const currentYear = props.currentYear;
  const currentMonth = props.currentMonth;

  return (
    <>
      <Card sx={{ width: "100%", padding: { md: "24px"} }}>
        <CardContent>
          <Box marginBottom={"12px"}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            {props.title === "勤怠実績" && (
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {`${currentYear}年${currentMonth}月`}
              </Typography>
            )}
            <Divider />
          </Box>
          {children}
        </CardContent>
      </Card>
    </>
  );
}

export default CardComponent;
