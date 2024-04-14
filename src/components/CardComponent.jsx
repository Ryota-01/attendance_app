import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

function CardComponent(props) {
  const children = props.children;
  const title = props.title;

  return (
    <>
      <Card
        sx={{
          padding: "12px",
          height: props.height,
          width: props.width,
          margin: props.margin,
        }}
      >
        <CardContent>
          <Box marginBottom={"12px"}>
            <Typography
              variant="h6"
              color="text.secondary"
              fontWeight={"bold"}
              gutterBottom
            >
              {title}
            </Typography>
          </Box>
          <Divider />
          {children}
        </CardContent>
      </Card>
    </>
  );
}

export default CardComponent;
