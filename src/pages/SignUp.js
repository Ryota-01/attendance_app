import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Header from "../components/Header";

export default function Signup() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [ errorMessage, setErrorMessage ] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log("登録");
      alert("ユーザー情報を登録しました");
    } catch (err) {
      setErrorMessage(err.message);
      console.log(errorMessage);
    }
  };

  console.log(errorMessage);

  return (
    <div>
      <Header />
      <h2>ユーザー登録</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input
            name="email"
            type="email"
            placeholder="e-mail"
            ref={emailRef}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            ref={passwordRef}
          />
        </div>
        <p>
          {errorMessage}
        </p>
        <div>
          <button>登録</button>
        </div>
      </form>
    </div>
  );
}
