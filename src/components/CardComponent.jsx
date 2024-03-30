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
          margin: props.margin
        }}
      >
        <CardContent>
          {title === "休暇取得一覧" ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
              }}
            >
              <Typography
                variant="h6"
                color="text.secondary"
                fontWeight={"bold"}
                gutterBottom
              >
                {title}
              </Typography>
              <Button
                variant="contained"
                size="small"
                color="success"
                href="/leaveRequest"
                sx={{ fontWeight: "bold" }}
              >
                休暇を申請する
              </Button>
            </Box>
          ) : (
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
          )}
          <Divider />
          {children}
        </CardContent>
      </Card>
    </>
  );
}

export default CardComponent;
