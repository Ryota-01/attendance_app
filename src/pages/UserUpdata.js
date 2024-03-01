import React, { useRef } from "react";
import { useAuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

export default function UserUpdata() {
  const { user } = useAuthContext();
  const userNameRef = useRef();
  console.log(user.uid);

  const handleSaveSubmit = async (e) => {
    e.preventDefault();
    const userName = userNameRef.current.value;
    const userEmail = user.email;
    const userCollectionRef = doc(db, "users", user.uid);
    try {
      const documentRef = await setDoc(userCollectionRef, {
        admin: false,
        userId: user.uid,
        name: userName,
        email: userEmail,
        timestamp: serverTimestamp(),
      });
      console.log("Success! ドキュメントID：", documentRef);
    } catch (e) {
      console.log("Error", e.message);
    }
  };

  return (
    <div>
      <h2>UserUpdata</h2>
      <div>
        <form onSubmit={handleSaveSubmit}>
          <div>
            <label>名前：</label>
            <input
              type="text"
              name="name"
              placeholder="テスト太郎"
              ref={userNameRef}
              required
            />
          </div>
          <div>
            <label>メールアドレス：{user.email}</label>
          </div>
          <button>保存</button>
        </form>
      </div>
    </div>
  );
}