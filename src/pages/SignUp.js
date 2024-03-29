import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useAuthContext } from "../context/AuthContext";
import { collection, doc, getDoc } from "firebase/firestore";
import CardComponent from "../components/CardComponent";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppBar, Toolbar } from "@mui/material";

export default function Signup() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      console.log("登録");
      alert("サインアップが完了しました");
      // usersコレクションを参照
      const userCollectionRef = collection(db, user.uid);
      // ユーザー情報のドキュメント
      const userInfoDocRef = doc(userCollectionRef, "userInfo");
      // ドキュメントを取得
      const snapShot = await getDoc(userInfoDocRef);
      if (snapShot.exists()) {
        navigate("/home");
      } else {
        navigate("/createuserinfo");
      }
    } catch (err) {
      setErrorMessage(err.message);
      console.log(errorMessage);
    }
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#3F4D67",
      },
    },
  });

  const textFieldStyle = (type, label) => ({
    type: type,
    label: label,
    required: true,
    fullWidth: true,
    variant: "outlined",
    size: "small",
    margin: "normal",
  });

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="fix" color="primary" enableColorOnDark>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              TimeNote
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>

      <CardComponent
        title={"SIGNUP"}
        width={{ xs: "84%", md: "50%" }}
        margin={"50px auto"}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
          <TextField
            inputRef={emailRef}
            {...textFieldStyle("email", "メールアドレス")}
          />
          <TextField
            inputRef={passwordRef}
            {...textFieldStyle("password", "パスワード")}
          />
          <Typography variant="body2" sx={{ mb: 1 }}>
            {errorMessage}
          </Typography>
          <ThemeProvider theme={darkTheme}>
            <Button type="submit" variant="contained" onSubmit={handleSubmit}>
              SIGNUP
            </Button>
          </ThemeProvider>

          <Typography variant="body2" sx={{ mt: 2 }}>
            ログインは<Link to={"/login"}>こちら</Link>
          </Typography>
        </Box>
      </CardComponent>
    </div>
  );
}
