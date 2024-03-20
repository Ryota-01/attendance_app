import React, { createContext, useContext, useEffect, useState } from "react";
import FetchUsers from "../components/service/FetchUsers";

const UserContext = createContext();


//ユーザーデータを提供するためのプロバイダーコンポーネント
export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}

// ユーザーコンテキストのカスタムフック
export const useUserContext = () => {
  return useContext(UserContext)
}