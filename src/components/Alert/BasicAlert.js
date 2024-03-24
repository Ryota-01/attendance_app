import React from "react";
import Alert from "@mui/material/Alert";

//　上手くいったよ的なアラート
export function BasicAlert({ message }) {
  return <Alert severity="success">This is a success Alert.</Alert>;
}

// なんかお知らせしたい時のアラート
export function InfoBasicAlert({ message }) {
  return <Alert severity="info">{message}</Alert>;
}

// 注意喚起したい時のアラート
export function WarningBasicAlert(props) {
  console.log(props);
  return (
    <Alert severity="warning" sx={{ }}>
      {props.message}
    </Alert>
  );
}

// エラーの時のアラート
export function ErrorBasicAlert({ message }) {
  return <Alert severity="error">{message}</Alert>;
}
