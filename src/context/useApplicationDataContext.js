import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { collection, doc, getDocs } from "firebase/firestore";
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

const ApplicationDataContext = createContext();

// ユーザーコンテキストのカスタムフック
export function useApplicationDataContext() {
  return useContext(ApplicationDataContext);
}

//ユーザーデータを提供するためのプロバイダーコンポーネント
export function ApplicationDataProvider({ children }) {
  const { user } = useAuthContext();
  const [applicationsData, setApplicationsData] = useState(null);
  const value = {
    applicationsData,
  };

  useEffect(() => {
    console.log(user)
    if (!user || user === null || user === undefined ) {
      return;
    }
    const fetchData = async () => {
      try {
        const currentYear = new Date().getFullYear(); // サブコレクション名を現在の年に
        const subCollectionName = `${currentYear}_applicationDatas`;
        const leaveRequestCollectionRef = collection(db, "leaveRequest");
        const leaveRequestDocRef = doc(leaveRequestCollectionRef, user.uid);
        const leaveRequestSubCollectionRef = collection(
          leaveRequestDocRef,
          subCollectionName
        );
        const leaveRequestSnapshot = await getDocs(
          leaveRequestSubCollectionRef
        );
        const leaveRequestData = leaveRequestSnapshot.docs.map((doc) =>
          doc.data()
        );
        setApplicationsData(leaveRequestData);
      } catch (e) {
        console.log("取得エラー", e.message);
      }
    };
    fetchData();
  }, [user]);

  return (
    <ApplicationDataContext.Provider value={value}>
      {children}
    </ApplicationDataContext.Provider>
  );
}
