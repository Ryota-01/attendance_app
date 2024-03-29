import React from "react";
import { TextField } from "@mui/material";

export default function FirstNameInput({ props }) {
  const register = props.register;
  const errors = props.errors;
  const varient = props.varient;

  return (
    <div>
      {!errors.firstName ? (
        <TextField
          label="名*"
          id="firstName"
          {...register("firstName", { required: true })}
          helperText="名を入力してください"
          variant={varient}
          fullWidth
          size="small"
        />
      ) : (
        <TextField
          error
          label="名*"
          id="firstName"
          {...register("firstName", { required: true })}
          helperText="名は必須入力です"
          variant={varient}
          fullWidth
          size="small"
        />
      )}
    </div>
  );
}
