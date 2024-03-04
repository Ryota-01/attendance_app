import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Button from "@mui/material/Button";
import "../css/LeaveRequestForm.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { CardContent } from "@mui/material";
import "../css/Login.css"

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
    <div className="wrapper">
      <ResponsiveAppBar />
      <div className="loginForm">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ p : 3 }}
        >
          <Typography variant="h5" gutterBottom>
            Login
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
            ログイン
          </Button>
          <Typography variant="body2" sx={{ mt : 2 }}>
            ユーザー登録は<Link to={"/signup"}>こちら</Link>から
          </Typography>
        </Box>
      </div>
    </div>
  );
}
