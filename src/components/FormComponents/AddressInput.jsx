import React from "react";
import { Grid, TextField } from "@mui/material";

export default function AddressInput({ props }) {
  const register = props.register;
  const errors = props.errors;
  const varient = props.varient;

  return (
    <div>
      <Grid item>
        {!errors.address1 ? (
          <TextField
            id="address1"
            {...register("address1", { required: true })}
            label="住所1*"
            variant={varient}
            size="small"
            fullWidth
            helperText="市区町村、番地など"
          />
        ) : (
          <TextField
            error
            id="address1"
            {...register("address1", { required: true })}
            label="住所1*"
            variant={varient}
            size="small"
            fullWidth
            helperText="住所1は必須入力です。市区町村、番地など"
          />
        )}
      </Grid>
      <Grid item>
        <TextField
          label="住所2"
          id="address2"
          {...register("address2")}
          variant={varient}
          size="small"
          fullWidth
          margin="normal"
          helperText="建物名など"
        />
      </Grid>
    </div>
  );
}
