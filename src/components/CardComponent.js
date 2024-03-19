import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

function CardComponent({ title, children }) {
  console.log(title)
  return (
    <div>
      <Sidebar />
      <Card sx={{ width: "72%", margin: "auto", padding: "24px" }}>
        <CardContent>
          <Box marginBottom={"12px"}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Divider />
          </Box>
          {children}
        </CardContent>
      </Card>
    </div>
  );
}

export default CardComponent;
