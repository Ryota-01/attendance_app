import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AttendanceDialog(props) {
  const dialogTitle = props.dialogMessage;
  const isDialogOpen = props.isDialogOpen; // boolean
  const [open, setOpen] = useState(isDialogOpen);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
      >
        <DialogTitle color="text.secondary">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Link to="/attendancelist">勤怠実績を確認する</Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
