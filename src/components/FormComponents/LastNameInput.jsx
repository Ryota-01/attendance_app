import React from "react";
import { TextField } from "@mui/material";

export default function LastNameInput({ props }) {
  const register = props.register;
  const errors = props.errors;
  const varient = props.varient;

  return (
    <div>
      {!errors.lastName ? (
        <TextField
          id="lastName"
          {...register("lastName", {
            required: {
              value: true,
              message: "姓は必須入力です",
            },
          })}
          label="姓*"
          helperText="姓を入力してください"
          variant={varient}
          fullWidth
          size="small"
        />
      ) : (
        <TextField
          error
          id="lastName"
          {...register("lastName", {
            required: {
              value: true,
              message: "姓は必須入力です",
            },
          })}
          label="姓*"
          helperText={errors.lastName.types.required}
          variant={varient}
          fullWidth
          size="small"
        />
      )}
    </div>
  );
}
