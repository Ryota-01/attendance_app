import React, { useEffect, useState } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "../css/UserCollectionStatus.css";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Snackbar from "@mui/material/Snackbar";

function AttendanceButtonPopup(props) {
  const popupMessage = props.popupMessage;
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
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
