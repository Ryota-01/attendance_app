import { TextField } from "@mui/material";
import React from "react";

export default function PostCodeInput({ props }) {
  const register = props.register;
  const errors = props.errors;
  const varient = props.varient;
  return (
    <div>
      {!errors.postCode ? (
        <TextField
          id="postCode"
          {...register("postCode", {
            required: {
              value: true,
              message: "郵便番号は必須入力です",
            },
            pattern: {
              value: /^[0-9]{3}-[0-9]{4}$/,
              message: "111-1111の形式で入力してください *ハイフンあり",
            },
          })}
          label="郵便番号*"
          variant={varient}
          helperText="郵便番号を入力してください（例：111-1111）"
          fullWidth
          size="small"
        />
      ) : (
        <TextField
          id="postCode"
          error
          {...register("postCode", {
            required: {
              value: true,
              message: "郵便番号は必須入力です",
            },
            pattern: {
              value: /^[0-9]{3}-[0-9]{4}$/,
              message: "111-1111の形式で入力してください *ハイフンあり",
            },
          })}
          label="郵便番号*"
          variant={varient}
          helperText={
            errors.postCode.types.required || errors.postCode.types.pattern
          }
          fullWidth
          size="small"
        />
      )}
    </div>
  );
}
