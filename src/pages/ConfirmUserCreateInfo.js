import React from "react";
import Sidebar from "../components/Sidebar/Sidebar.js";
import { useLocation } from "react-router-dom";
import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function ConfirmUserCreateInfo() {
  const location = useLocation();
  console.log(location)
  const padding = {
    padding: "18px",
  };
  const spacing = 3;
  const xs = (xsNumber) => {
    if (xsNumber) {
      return xsNumber;
    } else {
      return 8;
    }
  };
  const variant = (variant) => {
    if (variant) {
      return variant;
    } else {
      return "body2";
    }
  };

  return (
    <div>
      <Sidebar />
      <Card sx={{ width: "72%", margin: "auto", padding: "24px" }}>
        <CardContent>
          <Box marginTop={"32px"} textAlign={"center"}>
            <Typography
              variant={variant("h6")}
              color="text.secondary"
              gutterBottom
            >
              以下の内容で登録しますか？
            </Typography>
          </Box>
          <Grid
            container
            spacing={spacing}
            sx={{ padding: padding, width: "80%", margin: "auto" }}
          >
            <Grid item xs={xs(4)}>
              <Typography variant={variant()}>社員名：</Typography>
            </Grid>
            <Grid item xs={xs()}>
              <Typography variant={variant()}>
                {location.state.lastName} {location.state.firstName}
              </Typography>
            </Grid>
            <Grid item xs={xs(4)}>
              <Typography variant={variant()}>カナ：</Typography>
            </Grid>
            <Grid item xs={xs()}>
              <Typography variant={variant()}>
                {location.state.lastNameFurigana}{" "}
                {location.state.firstNameFurigana}
              </Typography>
            </Grid>

            <Grid item xs={xs(4)}>
              <Typography variant={variant()}>メールアドレス：</Typography>
            </Grid>
            <Grid item xs={xs()}>
              <Typography variant={variant()}>
                {location.state.email}
              </Typography>
            </Grid>

            <Grid item xs={xs(4)}>
              <Typography variant={variant()}>電話番号：</Typography>
            </Grid>
            <Grid item xs={xs()}>
              <Typography variant={variant()}>
                {location.state.phonenumber}
              </Typography>
            </Grid>

            <Grid item xs={xs(4)}>
              <Typography variant={variant()}>郵便番号：</Typography>
            </Grid>
            <Grid item xs={xs()}>
              <Typography variant={variant()}>
                {location.state.postCode}
              </Typography>
            </Grid>

            <Grid item xs={xs(4)}>
              <Typography variant={variant()}>都道府県：</Typography>
            </Grid>
            <Grid item xs={xs()}>
              <Typography variant={variant()}>
                {location.state.prefectures}
              </Typography>
            </Grid>

            <Grid item xs={xs(4)}>
              <Typography variant={variant()}>住所：</Typography>
            </Grid>
            <Grid item xs={xs()}>
              <Typography variant={variant()}>
                {location.state.address1}
                {location.state.address2}
              </Typography>
            </Grid>

            <Grid item xs={xs(4)}>
              <Typography variant={variant()}>入社日：</Typography>
            </Grid>
            <Grid item xs={xs()}>
              <Typography variant={variant()}>
                {location.state.joinDate}
              </Typography>
            </Grid>

            <Grid item xs={xs(4)}>
              <Typography variant={variant()}>雇用形態：</Typography>
            </Grid>
            <Grid item xs={xs()}>
              <Typography variant={variant()}>
                {location.state.employmentType}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
