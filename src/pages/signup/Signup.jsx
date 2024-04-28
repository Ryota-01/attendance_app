import { React, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  ThemeProvider,
  createTheme,
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import { auth, db } from "../../firebase";
import CardComponent from "../../components/CardComponent";
import { useAuthContext } from "../../context/AuthContext";
import logo from "../../imeges/logo.svg";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Signup() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

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

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="fix" color="primary" enableColorOnDark>
          <Toolbar>
            <img src={logo} width={120} href="/home" />
          </Toolbar>
        </AppBar>
      </ThemeProvider>

      <CardComponent
        title={"SIGNUP"}
        width={{ xs: "84%", md: "50%" }}
        margin={"50px auto"}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl
            variant="outlined"
            size="small"
            sx={{ marginBottom: "24px" }}
            fullWidth
          >
            <InputLabel htmlFor="outlined-adornment-email">ID</InputLabel>
            <OutlinedInput inputRef={emailRef} type="email" label="ID" placeholder="e-mail" />
          </FormControl>
          <FormControl
            variant="outlined"
            size="small"
            fullWidth
            sx={{ marginBottom: "18px" }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              inputRef={passwordRef}
              label="Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {errorMessage}
          </Typography>
          <Box display={"flex"} justifyContent={"space-between"}>
            <ThemeProvider theme={darkTheme}>
              <Button type="submit" variant="contained" onSubmit={handleSubmit}>
                SIGNUP
              </Button>
            </ThemeProvider>
            <Typography variant="body2" sx={{ mt: 2 }}>
              <Link to={"/login"}>ログインはこちら</Link>
            </Typography>
          </Box>
        </Box>
      </CardComponent>
    </div>
  );
}
