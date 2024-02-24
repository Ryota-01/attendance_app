import React, { useRef } from 'react'
import { auth } from '../firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export default function Signup() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(emailRef.current.value, passwordRef.current.value);
    auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
  }
  return (
    <div>
      <h2>ユーザー登録</h2>
        <form action="" onSubmit={onSubmit}>
          <div>
            <label>メールアドレス</label>
            <input name='e-mail' type='e-mail' placeholder='e-mail' ref={emailRef} />
          </div>
          <div>
            <label>パスワード</label>
            <input name='password' type='password' placeholder='password' ref={passwordRef} />
          </div>
          <div>
            <button>登録</button>
          </div>
        </form>
    </div>
  )
}
