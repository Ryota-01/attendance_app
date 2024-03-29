import { TextField } from "@mui/material";
import React from "react";

export default function PhoneNumberInput({ props }) {
  const register = props.register;
  // const errors = props.errors;
  const varient = props.varient;

  return (
    <div>
      <TextField
        id="phoneNumber"
        {...register("phoneNumber")}
        label="電話番号"
        type="tel"
        variant={varient}
        helperText="ハイフン無し"
        fullWidth
        size="small"
      />
    </div>
  );
}
