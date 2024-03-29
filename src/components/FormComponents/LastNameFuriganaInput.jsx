import { TextField } from "@mui/material";
import React from "react";

export default function LastNameFuriganaInput({ props }) {
  const register = props.register;
  const errors = props.errors;
  const varient = props.varient;

  return (
    <div>
      {!errors.lastNameFurigana ? (
        <TextField
          id="lastNameFurigana"
          {...register("lastNameFurigana", {
            required: {
              value: true,
              message: "姓(フリガナ)は必須入力です",
            },
            pattern: {
              value: /^[ァ-ンー　]+$/,
              message: "カナで入力してください",
            },
          })}
          label="セイ*"
          helperText="姓(フリガナ)を入力してください"
          variant={varient}
          fullWidth
          size="small"
        />
      ) : (
        <TextField
          error
          id="lastNameFurigana"
          {...register("lastNameFurigana", {
            required: {
              value: true,
              message: "姓(フリガナ)は必須入力です",
            },
            pattern: {
              value: /^[ァ-ンー　]+$/,
              message: "カナで入力してください",
            },
          })}
          label="セイ*"
          helperText={
            errors.lastNameFurigana.types.required ||
            errors.lastNameFurigana.types.pattern
          }
          variant={varient}
          fullWidth
          size="small"
        />
      )}
    </div>
  );
}
