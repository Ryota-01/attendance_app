import React from "react";
import Sidebar from "../components/Sidebar/Sidebar.js";
import { useLocation } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

export default function ConfirmUserCreateInfo(props) {
  const values = props.values;
  const { hideConfirmation } = props;
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
      <Box marginTop={"32px"} textAlign={"center"}>
        <Typography variant={variant("h6")} color="text.secondary" gutterBottom>
          以下の内容で登録しますか？
        </Typography>
      </Box>
      <Grid
        container
        spacing={spacing}
        sx={{ padding: padding, margin: "auto" }}
      >
        <Grid item xs={xs(4)}>
          <Typography variant={variant()}>社員名：</Typography>
        </Grid>
        <Grid item xs={xs()}>
          <Typography variant={variant()}>
            {values.lastName} {values.firstName}
          </Typography>
        </Grid>
        <Grid item xs={xs(4)}>
          <Typography variant={variant()}>カナ：</Typography>
        </Grid>
        <Grid item xs={xs()}>
          <Typography variant={variant()}>
            {values.lastNameFurigana} {values.firstNameFurigana}
          </Typography>
        </Grid>

        <Grid item xs={xs(4)}>
          <Typography variant={variant()}>メールアドレス：</Typography>
        </Grid>
        <Grid item xs={xs()}>
          <Typography variant={variant()}>{values.email}</Typography>
        </Grid>

        <Grid item xs={xs(4)}>
          <Typography variant={variant()}>電話番号：</Typography>
        </Grid>
        <Grid item xs={xs()}>
          <Typography variant={variant()}>{values.phonenumber}</Typography>
        </Grid>

        <Grid item xs={xs(4)}>
          <Typography variant={variant()}>郵便番号：</Typography>
        </Grid>
        <Grid item xs={xs()}>
          <Typography variant={variant()}>{values.postCode}</Typography>
        </Grid>

        <Grid item xs={xs(4)}>
          <Typography variant={variant()}>都道府県：</Typography>
        </Grid>
        <Grid item xs={xs()}>
          <Typography variant={variant()}>{values.prefectures}</Typography>
        </Grid>

        <Grid item xs={xs(4)}>
          <Typography variant={variant()}>住所：</Typography>
        </Grid>
        <Grid item xs={xs()}>
          <Typography variant={variant()}>
            {values.address1}
            {values.address2}
          </Typography>
        </Grid>

        <Grid item xs={xs(4)}>
          <Typography variant={variant()}>入社日：</Typography>
        </Grid>
        <Grid item xs={xs()}>
          <Typography variant={variant()}>{values.joinDate}</Typography>
        </Grid>

        <Grid item xs={xs(4)}>
          <Typography variant={variant()}>雇用形態：</Typography>
        </Grid>
        <Grid item xs={xs()}>
          <Typography variant={variant()}>{values.employmentType}</Typography>
        </Grid>
        <Grid container spacing={spacing} sx={{ padding: padding }}>
          <Grid item xs={2}>
            <Button
              type="submit"
              onClick={hideConfirmation}
              fullWidth
              variant="contained"
            >
              閉じる
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              type="submit"
              onClick={hideConfirmation}
              fullWidth
              variant="contained"
            >
              あああ
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
