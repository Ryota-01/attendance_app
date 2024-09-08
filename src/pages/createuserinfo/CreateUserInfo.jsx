import { React, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Divider, Grid } from "@mui/material";
import EmailInput from "../../components/FormComponents/EmailInput";
import EmploymentTypeInput from "../../components/FormComponents/EmploymentTypeInput";
import FirstNameFuriganaInput from "../../components/FormComponents/FirstNameFuriganaInput";
import FirstNameInput from "../../components/FormComponents/FirstNameInput";
import LastNameFuriganaInput from "../../components/FormComponents/LastNameFuriganaInput";
import JoinDateInput from "../../components/FormComponents/JoinDateInput";
import LastNameInput from "../../components/FormComponents/LastNameInput";
import PhoneNumberInput from "../../components/FormComponents/PhoneNumberInput";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import CardComponent from "../../components/CardComponent";
import NewSideBar from "../../components/Sidebar/NewSideBar";

export default function UserInfo() {
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const hideConfirmation = () => setIsConfirmationVisible(false);
  const {
    register,
    handleSubmit,
    getValues,
    methods,
    formState: { errors },
  } = useForm({ mode: "onChange", criteriaMode: "all" });

  const props = {
    varient: "filled",
    register: register,
    errors: errors,
  };
  const handleFormSubmit = () => setIsConfirmationVisible(true);
  const styles = {
    gridItem: {
      xs: 12,
      md: 6,
    },
    gridContainer: {
      spacing: 3,
      sx: {
        padding: "18px",
      },
    },
  };

  return (
    <NewSideBar>
      <CardComponent title={"社員情報作成"}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container {...styles.gridContainer}>
              {/* 苗字入力フォーム */}
              <Grid item {...styles.gridItem}>
                <LastNameInput props={props} />
              </Grid>

              {/* 名前入力フォーム */}
              <Grid item {...styles.gridItem}>
                <FirstNameInput props={props} />
              </Grid>

              {/* 苗字フリガナ入力フォーム */}
              <Grid item {...styles.gridItem}>
                <LastNameFuriganaInput props={props} />
              </Grid>

              {/* 名前フリガナ入力フォーム */}
              <Grid item {...styles.gridItem}>
                <FirstNameFuriganaInput props={props} />
              </Grid>
              {/* email入力フォーム */}
              <Grid item {...styles.gridItem}>
                <EmailInput props={props} />
              </Grid>
              <Grid item {...styles.gridItem}></Grid>

              {/* 電話番号入力フォーム */}
              <Grid item {...styles.gridItem}>
                <PhoneNumberInput props={props} />
              </Grid>
            </Grid>
            <Divider />

            <Grid container {...styles.gridContainer}>
              {/* 入社日フォーム */}
              <Grid item {...styles.gridItem}>
                <JoinDateInput props={props} />
              </Grid>
              <Grid item xs={6}></Grid>
              {/* 雇用形態フォーム */}
              <Grid item {...styles.gridItem}>
                <EmploymentTypeInput props={props} />
              </Grid>
            </Grid>
            <Grid container {...styles.gridContainer}>
              <Grid item xs={2}>
                <Button type="submit" fullWidth variant="contained">
                  確認
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
        {isConfirmationVisible && (
          <ConfirmDialog
            values={getValues()}
            hideConfirmation={hideConfirmation}
            isConfirmationVisible={isConfirmationVisible}
          />
        )}
      </CardComponent>
    </NewSideBar>
  );
}
