import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

//Contextとは、user情報を保管しておく箱のようなもの？
//contextを使うと、propsで橋渡しする必要がなく、どのコンポーネントからも呼び出せる。

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  const value = {
    user,
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      unsubscribed();
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
