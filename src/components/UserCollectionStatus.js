import React, { useEffect, useState } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "../css/UserCollectionStatus.css";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

export default function UserCollectionStatus() {
  // const [isUserCollectionCreated, setIsUserCollectionCreated] = useState(false);
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const checkUserCollection = async () => {
      try {
        // Userコレクションを参照
        const userCollectionRef = collection(db, "users");
        const userDocRef = doc(userCollectionRef, user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          // userIdと一致するドキュメントが存在する場合
          setOpen(false);
        } else {
          // 存在しない場合
          setOpen(true);
        }
      } catch (e) {
        console.error("Userコレクションの確認に失敗しました", e.message);
      }
    };
    checkUserCollection();
  }, []);
  console.log(open);

  return (
    <div className="userCollectionStatus">
      <div>
        {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="warning"
            variant="filled"
            sx={{ width: "100%", vertical:"top"}}
          >
            ユーザー情報を作成してください。
            <Link to="/createuserinfo">ユーザー情報作成画面</Link>へ移動する。
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
