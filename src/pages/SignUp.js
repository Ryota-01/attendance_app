import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Header from "../components/Header";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { CardContent } from "@mui/material";
import { Link } from "react-router-dom";

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
      <ResponsiveAppBar />
      <div className="loginForm">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ p : 3 }}
        >
          <Typography variant="h5" gutterBottom>
            Signup
          </Typography>
          <TextField
            required
            type="email"
            label="メールアドレス"
            variant="outlined"
            inputRef={emailRef}
            fullWidth
            margin="normal"            
          >
          </TextField>
          <TextField
            required
            label="パスワード"
            type="password"
            variant="outlined"
            inputRef={passwordRef}
            fullWidth
            margin="normal"
          />
          <Typography
            variant="body2" 
            sx={{ mb : 1 }}
          >
            {errorMessage}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            onSubmit={handleSubmit}
            fullWidth
          >
            signup
          </Button>
          <Typography variant="body2" sx={{ mt : 2 }}>
            ログインは<Link to={"/login"}>こちら</Link>
          </Typography>
        </Box>
      </div>
    </div>
  );
}
