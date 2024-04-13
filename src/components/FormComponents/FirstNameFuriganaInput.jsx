import React from "react";
import { TextField } from "@mui/material";

export default function FirstNameFuriganaInput({ props }) {
  const register = props.register;
  const errors = props.errors;
  const varient = props.varient;

  return (
    <div>
      {!errors.firstNameFurigana ? (
        <TextField
          id="firstNameFurigana"
          {...register("firstNameFurigana", {
            required: {
              value: true,
              message: "姓(フリガナ)は必須入力です",
            },
            pattern: {
              value: /^[ァ-ンー　]+$/,
              message: "カナで入力してくださいÏ",
            },
          })}
          label="メイ*"
          helperText="名(フリガナ)を入力してください"
          variant={varient}
          fullWidth
          size="small"
        />
      ) : (
        <TextField
          error
          id="firstNameFurigana"
          {...register("firstNameFurigana", {
            required: {
              value: true,
              message: "姓(フリガナ)は必須入力です",
            },
            pattern: {
              value: /^[ァ-ンー　]+$/,
              message: "カナで入力してください",
            },
          })}
          label="メイ*"
          variant={varient}
          helperText={
            errors.firstNameFurigana.types.required ||
            errors.firstNameFurigana.types.pattern
          }
          fullWidth
          size="small"
        />
      )}
    </div>
  );
}
