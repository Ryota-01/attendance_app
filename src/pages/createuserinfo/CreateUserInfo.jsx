import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Divider, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddressInput from "../../components/FormComponents/AddressInput";
import EmailInput from "../../components/FormComponents/EmailInput";
import EmploymentTypeInput from "../../components/FormComponents/EmploymentTypeInput";
import FirstNameFuriganaInput from "../../components/FormComponents/FirstNameFuriganaInput";
import FirstNameInput from "../../components/FormComponents/FirstNameInput";
import LastNameFuriganaInput from "../../components/FormComponents/LastNameFuriganaInput";
import JoinDateInput from "../../components/FormComponents/JoinDateInput";
import LastNameInput from "../../components/FormComponents/LastNameInput";
import PhoneNumberInput from "../../components/FormComponents/PhoneNumberInput";
import PostCodeInput from "../../components/FormComponents/PostCodeInput";
import PrefecturesInput from "../../components/FormComponents/PrefecturesInput";
import { WarningBasicAlert } from "../../components/BasicAlert";
import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import CardComponent from "../../components/CardComponent";

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

  const padding = {
    padding: "18px",
  };
  const spacing = 3;
  const spItemSpacing = (spacingNumber) => {
    if (spacingNumber) {
      return;
    } else {
      return 12;
    }
  };

  const pcItemSpacing = (spacingNumber) => {
    if (spacingNumber) {
      return;
    } else {
      return 6;
    }
  };

  const props = {
    varient: "filled",
    register: register,
    errors: errors,
  };
  const handleFormSubmit = () => setIsConfirmationVisible(true);

  return (
    <Box sx={{ padding: "56px" }}>
      <Box sx={{ marginBottom: "24px" }}>
        <WarningBasicAlert
          message={"ユーザー情報を作成してください"}
          height={"100px"}
        />
      </Box>
      <CardComponent title={"社員情報作成"}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container spacing={spacing} sx={{ padding: padding }}>
              {/* 苗字入力フォーム */}
              <Grid item xs={spItemSpacing()} md={pcItemSpacing()}>
                <LastNameInput props={props} />
              </Grid>

              {/* 名前入力フォーム */}
              <Grid item xs={spItemSpacing()} md={pcItemSpacing()}>
                <FirstNameInput props={props} />
              </Grid>

              {/* 苗字フリガナ入力フォーム */}
              <Grid item xs={spItemSpacing()} md={pcItemSpacing()}>
                <LastNameFuriganaInput props={props} />
              </Grid>

              {/* 名前フリガナ入力フォーム */}
              <Grid item xs={spItemSpacing()} md={pcItemSpacing()}>
                <FirstNameFuriganaInput props={props} />
              </Grid>
              {/* email入力フォーム */}
              <Grid item xs={spItemSpacing()} md={pcItemSpacing()}>
                <EmailInput props={props} />
              </Grid>
              <Grid item xs={spItemSpacing()} md={pcItemSpacing()}></Grid>

              {/* 電話番号入力フォーム */}
              <Grid item xs={spItemSpacing()} md={pcItemSpacing()}>
                <PhoneNumberInput props={props} />
              </Grid>
            </Grid>
            <Divider />

            <Grid container spacing={spacing} sx={{ padding: padding }}>
              {/* 郵便番号入力フォーム */}
              <Grid item xs={spItemSpacing()} md={pcItemSpacing()}>
                <PostCodeInput props={props} />
              </Grid>
              <Grid item xs={spItemSpacing()} md={pcItemSpacing()}></Grid>
              {/* 都道府県入力フォーム */}
              <Grid item xs={spItemSpacing()} md={pcItemSpacing()}>
                <PrefecturesInput props={props} />
              </Grid>
              <Grid item xs={spItemSpacing()} md={pcItemSpacing()}></Grid>
              {/* 住所入力フォーム */}
              <Grid item xs={spItemSpacing()} md={pcItemSpacing()}>
                <AddressInput props={props} />
              </Grid>
            </Grid>
            <Divider />
            <Grid container spacing={spacing} sx={{ padding: padding }}>
              {/* 入社日フォーム */}
              <Grid item xs={spItemSpacing()}>
                <JoinDateInput props={props} />
              </Grid>
              <Grid item xs={6}></Grid>
              {/* 雇用形態フォーム */}
              <Grid item xs={spItemSpacing()}>
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
        {isConfirmationVisible && (
          <ConfirmDialog
            values={getValues()}
            hideConfirmation={hideConfirmation}
            isConfirmationVisible={isConfirmationVisible}
          />
        )}
      </CardComponent>
    </Box>
  );
}
