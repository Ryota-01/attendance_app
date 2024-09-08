import React from "react";
import { TextField } from "@mui/material";

export default function EmailInput({ props }) {
  const varient = props.varient;
  const errors = props.errors;
  const register = props.register;
  
  return (
    <div>
      {!errors.email ? (
        <TextField
          id="email"
          {...register("email", {
            required: {
              value: true,
              message: "メールアドレスは必須入力です",
            },
            pattern: {
              value:
                /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
              message: "name@example.comの形式で入力してください",
            },
          })}
          label="メールアドレス*"
          type="email"
          variant={varient}
          helperText="name@example.com"
          fullWidth
          size="small"
        />
      ) : (
        <TextField
          id="email"
          error
          {...register("email", {
            required: {
              value: true,
              message: "メールアドレスは必須入力です",
            },
            pattern: {
              value:
                /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
              message: "name@example.comの形式で入力してください",
            },
          })}
          label="メールアドレス*"
          type="email"
          variant={varient}
          helperText={errors.email.types.required || errors.email.types.pattern}
          fullWidth
          size="small"
        />
      )}
    </div>
  );
}
