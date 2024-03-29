import { TextField } from "@mui/material";
import React from "react";

export default function PrefecturesInput({ props }) {
  const register = props.register;
  const errors = props.errors;
  const varient = props.varient;

  return (
    <div>
      {!errors.prefectures ? (
        <TextField
          id="prefectures"
          {...register("prefectures", { required: true })}
          label="都道府県*"
          variant={varient}
          helperText="都道府県名を入力してください"
          fullWidth
          size="small"
        />
      ) : (
        <TextField
          error
          id="prefectures"
          {...register("prefectures", { required: true })}
          label="都道府県*"
          variant={varient}
          helperText="都道府県名は必須入力です"
          fullWidth
          size="small"
        />
      )}
    </div>
  );
}
