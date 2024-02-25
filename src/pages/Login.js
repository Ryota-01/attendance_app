import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log("Success!");
      navigate("/");
    } catch (e) {
      console.log(e);
      setErrorMessage(e.message);
    }
  };

  return (
    <div>
      <h2>ログイン</h2>
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
        <div>
          <button>ログイン</button>
        </div>
      </form>
      <p>{errorMessage}</p>
      <div>
        ユーザー登録は<Link to={"/signup"}>こちら</Link>から
      </div>
    </div>
  );
}
