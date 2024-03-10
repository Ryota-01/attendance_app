import React, { useEffect, useState } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import "../../css/UserCollectionStatus.css";
import AlertTitle from "@mui/material/AlertTitle";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import Alert from "@mui/material/Alert";

export default function UserCollectionStatus() {
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);

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
