import { React, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  ThemeProvider,
  createTheme,
  Typography,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth } from "../../firebase";
import CardComponent from "../../components/CardComponent";
import logo from "../../imeges/logo.svg";
import { InfoBasicAlert } from "../../components/BasicAlert";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  // エラーメッセージが表示された後に再入力をするとき、メッセージを非表示にする
  const hideErrorMessage = () => {
    setErrorMessage("");
  };

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
    } catch (err) {
      if (
        err.code === "auth/invalid-email" &&
        emailRef.current.value.length === 0
      ) {
        setErrorMessage("*メールアドレスを入力してください");
      } else if (err.code === "auth/invalid-credential") {
        setErrorMessage("*メールアドレスまたはパスワードが一致しません。");
      } else if (err.code === "auth/missing-password") {
        setErrorMessage("*パスワードを入力してください");
      } else if (passwordRef.current.value.length < 6) {
        setErrorMessage("*パスワードは６文字以上入力してください");
      } else {
        alert(
          "エラーのため登録ができませんでした。恐れ入りますが再度お試しください"
        );
      }
      console.log(err.code);
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
    <>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="fix" color="primary" enableColorOnDark>
          <Toolbar>
            <img src={logo} width={120} href="/home" />
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <CardComponent
        title={"LOGIN"}
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
            <OutlinedInput
              onChange={hideErrorMessage}
              placeholder="登録済みのメールアドレス"
              inputRef={emailRef}
              type="email"
              label="ID"
            />
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
              placeholder="6文字以上入力してください"
              type={showPassword ? "text" : "password"}
              onChange={hideErrorMessage}
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
          <Typography
            variant="body2"
            color="red"
            fontWeight="bold"
            sx={{ mb: 2 }}
          >
            {errorMessage}
          </Typography>

          <Box display={"flex"} justifyContent={"space-between"}>
            <ThemeProvider theme={darkTheme}>
              <Button type="submit" variant="contained" onSubmit={handleSubmit}>
                LOGIN
              </Button>
            </ThemeProvider>
            <Typography variant="body2" sx={{ mt: 2 }}>
              <Link to={"/signup"}>ユーザー登録はこちら</Link>
            </Typography>
          </Box>
        </Box>
        <Box sx={{ margin: "24px auto 0 auto" }}>
          <InfoBasicAlert message="パスワードを忘れた方は管理者へお問合せください" />
        </Box>
      </CardComponent>
    </>
  );
}
