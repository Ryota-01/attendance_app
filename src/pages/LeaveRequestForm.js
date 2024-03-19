import React, { useRef, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar.js";
import "../css/LeaveRequestForm.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import LeaveRequestConfirmDialog from "../components/Dialog/LeaveRequestConfirmDialog";
import { Box } from "@mui/system";
import { Button, Card, CardContent, Divider, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import CardComponent from "../components/CardComponent.js";

export default function LeaveRequestForm() {
  // モーダルの表示・非表示を切り替えるstate
  const [isLeaveRequestConfirmation, setIsLeaveRequestConfirmation] =
    useState(false);
  // モーダルを閉じるstate
  const hideConfirmation = () => setIsLeaveRequestConfirmation(false);
  const {
    register,
    handleSubmit,
    getValues,
    methods,
    formState: { errors },
  } = useForm({ mode: "onChange", criteriaMode: "all" });
  console.log(errors.applicant);

  const padding = {
    padding: "18px",
  };
  const spacing = 4;
  const xs = 8;
  const varient = "filled";

  const leaveRequestType = [
    {
      value: "有休休暇",
      label: "有休休暇",
    },
    {
      value: "特別休暇(代休)",
      label: "特別休暇(代休)",
    },
  ];

  const handleFormSubmit = () => setIsLeaveRequestConfirmation(true);

  return (
    <div>
      <CardComponent title={"休暇申請"}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={spacing} sx={{ padding: padding }}>
            <Grid item xs={4}>
              {!errors.applicant ? (
                <TextField
                  id="applicant"
                  {...register("applicant", {
                    required: {
                      value: true,
                      message: "必須入力です",
                    },
                  })}
                  label="申請者*"
                  helperText="名前を入力してください"
                  variant={varient}
                  size="small"
                  fullWidth
                />
              ) : (
                <TextField
                  id="applicant"
                  error
                  {...register("applicant", {
                    required: {
                      value: true,
                      message: "必須入力です",
                    },
                  })}
                  label="申請者*"
                  helperText={errors.applicant.types.required}
                  variant={varient}
                  size="small"
                  fullWidth
                />
              )}
            </Grid>
          </Grid>
          <Grid container spacing={spacing} sx={{ padding: padding }}>
            <Grid item xs={4}>
              {!errors.leaveType ? (
                <TextField
                  select
                  id="leaveType"
                  label="休暇種類*"
                  size="small"
                  defaultValue="有休休暇"
                  helperText="休暇種別を選択してください"
                  variant={varient}
                  {...register("leaveType", {
                    required: {
                      value: true,
                      message: "必須入力です。休暇の種類を選択してください",
                    },
                  })}
                  fullWidth
                >
                  {leaveRequestType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  select
                  error
                  id="leaveType"
                  label="休暇種類*"
                  size="small"
                  defaultValue="有休休暇"
                  helperText={errors.leaveType.types.required}
                  variant={varient}
                  {...register("leaveType", {
                    required: {
                      value: true,
                      message: "必須入力です。休暇の種類を選択してください",
                    },
                  })}
                  fullWidth
                >
                  {leaveRequestType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={spacing} sx={{ padding: padding }}>
            <Grid item xs={xs}>
              {!errors.leaveDate ? (
                <TextField
                  label="休暇取得日*"
                  id="leaveDate"
                  type="date"
                  size="small"
                  helperText="開始日を入力してください"
                  variant={varient}
                  {...register("leaveDate", {
                    required: {
                      value: true,
                      message: "必須入力です。休暇取得日を選択してください。",
                    },
                  })}
                  fullWidth
                />
              ) : (
                <TextField
                  label="休暇取得日*"
                  id="leaveDate"
                  type="date"
                  size="small"
                  helperText={errors.leaveDate.types.required}
                  variant={varient}
                  {...register("leaveDate", {
                    required: {
                      value: true,
                      message: "必須入力です。休暇取得日を選択してください。",
                    },
                  })}
                  error
                  fullWidth
                />
              )}
            </Grid>
          </Grid>
          <Grid container spacing={spacing} sx={{ padding: padding }}>
            <Grid item xs={xs}>
              {!errors.leaveReason ? (
                <TextField
                  id="leaveReason"
                  label="申請理由*"
                  helperText="申請理由を入力してください"
                  size="small"
                  variant={varient}
                  {...register("leaveReason", {
                    required: {
                      value: true,
                      message: "必須入力。申請理由を入力してください。",
                    },
                  })}
                  fullWidth
                />
              ) : (
                <TextField
                  id="leaveReason"
                  label="申請理由*"
                  size="small"
                  helperText={errors.leaveReason.types.required}
                  variant={varient}
                  {...register("leaveReason", {
                    required: {
                      value: true,
                      message: "必須入力。申請理由を入力してください。",
                    },
                  })}
                  error
                  fullWidth
                />
              )}
            </Grid>
          </Grid>
          <Grid container spacing={spacing} sx={{ padding: padding }}>
            <Grid item xs={xs}>
              <TextField
                label="備考"
                size="small"
                helperText="備考を入力してください（任意）"
                variant={varient}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={spacing} sx={{ padding: padding }}>
            <Grid item xs={xs}>
              <Button type="submit" variant="contained">
                確認
              </Button>
              {/* <LeaveRequestConfirmDialog
                  isLeaveRequestConfirmation={isLeaveRequestConfirmation}
                  hideConfirmation={hideConfirmation}
                /> */}
            </Grid>
          </Grid>
        </form>
        {isLeaveRequestConfirmation && (
          <LeaveRequestConfirmDialog
            values={getValues()}
            isLeaveRequestConfirmation={isLeaveRequestConfirmation}
            hideConfirmation={hideConfirmation}
          />
        )}
      </CardComponent>
    </div>
  );
}
