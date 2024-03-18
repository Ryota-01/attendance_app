import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useAuthContext } from "../context/AuthContext";
import { auth, db } from "../firebase";
import { doc, getDoc, collection, setDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar.js";
import { Card, CardContent, Divider, Grid } from "@mui/material";
import ConfirmUserCreateInfo from "./ConfirmUserCreateInfo.js";
import AddressInput from "../components/FormComponents/AddressInput.js";
import EmailInput from "../components/FormComponents/EmailInput.js";
import EmploymentTypeInput from "../components/FormComponents/EmploymentTypeInput.js";
import FirstNameFuriganaInput from "../components/FormComponents/FirstNameFuriganaInput.js";
import FirstNameInput from "../components/FormComponents/FirstNameInput.js";
import LastNameFuriganaInput from "../components/FormComponents/LastNameFuriganaInput.js";
import JoinDateInput from "../components/FormComponents/JoinDateInput.js";
import LastNameInput from "../components/FormComponents/LastNameInput.js";
import PhoneNumberInput from "../components/FormComponents/PhoneNumberInput.js";
import PostCodeInput from "../components/FormComponents/PostCodeInput.js";
import PrefecturesInput from "../components/FormComponents/PrefecturesInput.js";
import { FormProvider, useForm } from "react-hook-form";
import ConfirmDialog from "../components/Dialog/ConfirmDialog.js";

export default function UserInfo() {
  const { user } = useAuthContext();
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const hideConfirmation = () => setIsConfirmationVisible(false);
  const navigate = useNavigate();
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
  const handleFormSubmit = () => setIsConfirmationVisible(true);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Userコレクションを参照
  //     const userCollectionRef = collection(db, "users");
  //     // userコレクション内のuserドキュメントを参照
  //     const userDocRef = doc(userCollectionRef, user.uid);
  //     // userドキュメントが存在するか確認
  //     const userDocSnap = await getDoc(userDocRef);
  //     if (!userDocSnap.empty) {
  //       //userドキュメントが存在しない場合は新規作成
  //       const data = {
  //         date: new Date(),
  //         // userName: nameRef.current.value,
  //         userId: user.uid,
  //         email: user.email,
  //         joinDate: joinDateRef.current.value,
  //         phoneNumber: phoneNumberRef.current.value,
  //         employmentType: employmentTypeRef.current.value,
  //         admin: false,
  //       };
  //       await setDoc(userDocRef, data);
  //       navigate("/home");
  //       console.log("Success!");
  //     }
  //   } catch (e) {
  //     console.log("ユーザー情報の作成に失敗しました", e.message);
  //   }
  // };

  return (
    <div>
      <Sidebar />
      <Card sx={{ width: "72%", margin: "auto", padding: "24px" }}>
        <CardContent>
          <Box marginBottom={"12px"}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              社員情報作成
            </Typography>
            <Divider />
          </Box>
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
          {isConfirmationVisible && (
            <ConfirmDialog
              values={getValues()}
              hideConfirmation={hideConfirmation}
              isConfirmationVisible={isConfirmationVisible}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
