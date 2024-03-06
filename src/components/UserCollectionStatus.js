import React, { useEffect, useState } from 'react'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { auth, db } from "../firebase";
import "../css/UserCollectionStatus.css";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function UserCollectionStatus() {
  const [isUserCollectionCreated, setIsUserCollectionCreated] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    const checkUserCollection = async () => {
      try {
        // Userコレクションを参照
        const userCollectionRef = collection(db, "users");
        const userDocRef = doc(userCollectionRef, user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          // userIdと一致するドキュメントが存在しない場合
          setIsUserCollectionCreated(false);
        } else {
          // 存在する場合
          setIsUserCollectionCreated(true);
        }
      } catch (e) {
        console.error("Userコレクションの確認に失敗しました", e.message);
      }
    }
    checkUserCollection();
  }, []);

  return (
    <div className='userCollectionStatus'>
      {isUserCollectionCreated ? (
        <div className='userCollectionStatus_message'>
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            <Link to="/userinfo">ユーザー情報を作成してください</Link>
          </Alert>
        </div>
      ) : (
        <>
        </>
      )}
    </div>
  )
}
