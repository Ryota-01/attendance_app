import React, { useRef } from "react";
import { useAuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, addDoc, setDoc, doc, serverTimestamp } from "firebase/firestore";

export default function UserUpdata() {
  const { user } = useAuthContext();
  const userNameRef = useRef();

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    const userName = userNameRef.current.value;
    const userEmail = user.email;
    const userCollectionRef = doc(db, "users", userName + "_" + userEmail);
    const documentRef = setDoc(userCollectionRef, {
      admin : false,
      name : userName,
      email : userEmail,
      timestamp : serverTimestamp()
    })
    .then (() => {
      console.log("Success!");
    })
    .catch((e) => {
      console.log("Error", e.message);
    })
  };

  return (
    <div>
      ーーーーここからユーザー情報作成エリアーーーー
      <h2>ユーザー情報追加だぞ</h2>
      <div>
        <form onSubmit={handleSaveSubmit}>
          <div>
            <label>名前：</label>
            <input type="text" name="name" placeholder="テスト太郎" ref={userNameRef} required/>
          </div>
          <div>
            <label>メールアドレス：{user.email}</label>
          </div>
          <button>保存</button>
        </form>
      </div>
      ーーーーここまでユーザー情報作成エリアーーーー
    </div>
  );
}
