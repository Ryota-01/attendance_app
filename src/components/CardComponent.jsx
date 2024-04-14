import React from "react";
import { Box, Card, Divider, Typography } from "@mui/material";

function CardComponent(props) {
  const children = props.children;
  const title = props.title;
  const bgColor = props.bgColor;
  const styles = {
    box: {
      padding: "8px 24px",
    },
    boxBottom: {
      padding: "20px 24px",
    },
  };

  return (
    <>
      <Card
        sx={{
          width: props.width,
          margin: props.margin,
          height: "100%",
          position: "relative",
          boxShadow: "0 2px 12px lightgray",
        }}
      >
        <Box
          sx={{
            background: bgColor,
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "4px",
          }}
        ></Box>
        <Box {...styles.box}>
          <Typography variant="h7" color="text.secondary" fontWeight={"bold"}>
            {title}
          </Typography>
        </Box>
        <Divider />
        <Box {...styles.boxBottom}>{children}</Box>
      </Card>
    </>
  );
}

export default CardComponent;
