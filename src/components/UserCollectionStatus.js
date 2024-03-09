import React, { useEffect, useState } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "../css/UserCollectionStatus.css";
import AlertTitle from "@mui/material/AlertTitle";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function UserCollectionStatus() {
  // const [isUserCollectionCreated, setIsUserCollectionCreated] = useState(false);
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // };

  useEffect(() => {
    const checkUserCollection = async () => {
      try {
        // Userコレクションを参照
        const userCollectionRef = collection(db, "users");
        const userDocRef = doc(userCollectionRef, user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          // userIdと一致するドキュメントが存在する場合
          console.log(user);
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
      {open ? (
        <Alert severity="warning">
          <AlertTitle>ユーザー情報を作成してください。</AlertTitle>
          <Link to="/createuserinfo">ユーザー情報作成画面</Link>へ移動
        </Alert>
      ) : (
        <></>
      )}
      {/* <Alert severity="warning">
        <AlertTitle>ユーザー情報を作成してください。</AlertTitle>
        <Link to="/createuserinfo">ユーザー情報作成画面</Link>へ移動
      </Alert> */}
    </div>
  );
}
