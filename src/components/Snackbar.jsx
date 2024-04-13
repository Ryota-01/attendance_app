import { React, useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

function AttendanceButtonPopup(props) {
  const popupMessage = props.popupMessage;
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div className="userCollectionStatus">
      <div>
        <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%", vertical: "top" }}
          >
            {popupMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default AttendanceButtonPopup;
