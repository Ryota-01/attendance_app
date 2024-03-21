import React, { createContext, useContext, useEffect, useState } from "react";
import FetchUserData from "../components/service/FetchUserData";
import { useAuthContext } from "./AuthContext";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

//① コンテキストの作成
// const コンテキスト名 = createContext();
// ②コンテキストを使用するコンポーネントを定数名.Providerで囲む
// {/* <定数名.Provider value={コンテキストに格納する値}> */}
//  <コンポーネント />
// </定数名.Provider>

// ③コンテキストから値を取り出す
// const コンポーネント = () => {
// const 定数名　= useContext（Contextオブジェクト）
// }

const UserContext = createContext();

// ユーザーコンテキストのカスタムフック
export function useUserContext () {
  return useContext(UserContext);
}

//ユーザーデータを提供するためのプロバイダーコンポーネント
export function UserProvider({ children }) {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState(null);
  const value = {
    userData
  }

  useEffect(() => {
    const FetchUserData = async () => {
      try {
        if(user.uid === null) {
          return 
        }
        const usersCollectionRef = collection(db, "users");
        const userDocRef = doc(usersCollectionRef, user.uid);
        const snapShot = await getDoc(userDocRef);
        const userData = snapShot.data();
        setUserData(userData);
      } catch (e) {
        console.log(e.message);
      }
    };
    FetchUserData();
  }, [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}