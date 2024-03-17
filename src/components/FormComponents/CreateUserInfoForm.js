import React, { useState } from "react";
import AddressInput from "../FormComponents/AddressInput.js";
import EmailInput from "../FormComponents/EmailInput.js";
import EmploymentTypeInput from "../FormComponents/EmploymentTypeInput.js";
import FirstNameFuriganaInput from "../FormComponents/FirstNameFuriganaInput.js";
import FirstNameInput from "../FormComponents/FirstNameInput.js";
import LastNameFuriganaInput from "../FormComponents/LastNameFuriganaInput.js";
import JoinDateInput from "../FormComponents/JoinDateInput.js";
import LastNameInput from "../FormComponents/LastNameInput.js";
import PhoneNumberInput from "../FormComponents/PhoneNumberInput.js";
import PostCodeInput from "../FormComponents/PostCodeInput.js";
import PrefecturesInput from "../FormComponents/PrefecturesInput.js";
import { FormProvider, useForm } from "react-hook-form";
import { Divider, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function CreateUserInfoForm({ onSubmit }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    methods,
    formState: { errors },
  } = useForm({ mode: "onChange", criteriaMode: "all" });

  const padding = {
    padding: "18px",
  };
  const spacing = 3;
  const xs = (number) => {
    if (number) {
      return number;
    } else {
      return 6;
    }
  };
  const props = {
    varient: "filled",
    register: register,
    errors: errors,
  };
  const handleFormSubmit = (userData) => {
    navigate("/confirmusercreateinfo", {
      state: userData
    })
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={spacing} sx={{ padding: padding }}>
            {/* 苗字入力フォーム */}
            <Grid item xs={xs()}>
              <LastNameInput props={props} />
            </Grid>

            {/* 名前入力フォーム */}
            <Grid item xs={xs()}>
              <FirstNameInput props={props} />
            </Grid>

            {/* 苗字フリガナ入力フォーム */}
            <Grid item xs={xs()}>
              <LastNameFuriganaInput props={props} />
            </Grid>

            {/* 名前フリガナ入力フォーム */}
            <Grid item xs={xs()}>
              <FirstNameFuriganaInput props={props} />
            </Grid>
            {/* email入力フォーム */}
            <Grid item xs={xs()}>
              <EmailInput props={props} />
            </Grid>
            <Grid item xs={xs()}></Grid>

            {/* 電話番号入力フォーム */}
            <Grid item xs={xs()}>
              <PhoneNumberInput props={props} />
            </Grid>
          </Grid>
          <Divider />

          <Grid container spacing={spacing} sx={{ padding: padding }}>
            {/* 郵便番号入力フォーム */}
            <Grid item xs={xs()}>
              <PostCodeInput props={props} />
            </Grid>
            <Grid item xs={xs()}></Grid>
            {/* 都道府県入力フォーム */}
            <Grid item xs={xs()}>
              <PrefecturesInput props={props} />
            </Grid>
            {/* 住所入力フォーム */}
            <Grid item xs={xs(12)}>
              <AddressInput props={props} />
            </Grid>
          </Grid>
          <Divider />
          <Grid container spacing={spacing} sx={{ padding: padding }}>
            {/* 入社日フォーム */}
            <Grid item xs={xs()}>
              <JoinDateInput props={props} />
            </Grid>
            <Grid item xs={6}></Grid>
            {/* 雇用形態フォーム */}
            <Grid item xs={xs()}>
              <EmploymentTypeInput props={props} />
            </Grid>
          </Grid>
          <Grid container spacing={spacing} sx={{ padding: padding }}>
            <Grid item xs={2}>
              <Button type="submit" fullWidth variant="contained">
                確認
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </div>
  );
}
