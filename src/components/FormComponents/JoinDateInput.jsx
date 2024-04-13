import React from "react";
import { TextField } from "@mui/material";

export default function JoinDateInput({ props }) {
  const register = props.register;
  const errors = props.errors;
  const varient = props.varient;

  return (
    <div>
      {!errors.joinDate ? (
        <TextField
          id="joinDate"
          {...register("joinDate", { required: true })}
          label="入社日*"
          type="date"
          variant={varient}
          helperText="入社日を選択してください"
          fullWidth
          size="small"
        />
      ) : (
        <TextField
          error
          id="joinDate"
          {...register("joinDate", { required: true })}
          label="入社日*"
          type="date"
          variant={varient}
          helperText="入社日を選択してください"
          fullWidth
          size="small"
        />
      )}
    </div>
  );
}
