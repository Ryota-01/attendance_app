import React from "react";
import { useAuthContext } from "../context/AuthContext";

export default function Header() {
  const { user } = useAuthContext();
  return (
    <div>
      <header>
        <h2>Header</h2>
        {user ? (
          <ul>
            <li>打刻</li>
            <li>勤怠一覧</li>
            <li>社員名：{user.email}</li>
          </ul>
        ) : (
          <></>
        )}
      </header>
    </div>
  );
}
