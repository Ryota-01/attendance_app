import React from "react";
import { TextField, MenuItem } from "@mui/material";

export default function EmploymentTypeInput({ props }) {
  const register = props.register;
  const errors = props.errors;
  const varient = props.varient;

  const employmentTypes = [
    {
      value: "正社員",
      label: "正社員",
    },
    {
      value: "アルバイト",
      label: "アルバイト",
    },
    {
      value: "業務委託",
      label: "業務委託",
    },
  ];

  return (
    <>
      {!errors.employmentType ? (
        <TextField
          select
          fullWidth
          id="employmentType"
          label="雇用形態*"
          helperText="雇用形態を選択してください"
          defaultValue="正社員"
          size="small"
          {...register("employmentType", { required: true })}
          variant={varient}
        >
          {employmentTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      ) : (
        <TextField
          select
          fullWidth
          error
          id="employmentType"
          label="雇用形態*"
          helperText="雇用形態を選択してください"
          defaultValue="正社員"
          size="small"
          {...register("employmentType", { required: true })}
          variant={varient}
        >
          {employmentTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    </>
  );
}
