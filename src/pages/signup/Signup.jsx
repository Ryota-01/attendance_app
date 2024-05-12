import { React, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
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

  // パスワードを表示
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

  // SIGNUPボタンを押した時の処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      alert("サインアップが完了しました");
      navigate("/home");
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setErrorMessage("*無効なメールアドレスです");
      } else if (err.code === "auth/email-already-in-use") {
        setErrorMessage("*このメールアドレスは既に使用されています");
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

  //　カラーテーマ
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#3F4D67",
      },
    },
  });

  const styles = (ref, onChange, type, label, placeholder) => ({
    formContorolStyle: {
      variant: "outlined",
      size: "small",
      fullWidth: "fullWidth",
      sx: {
        marginBottom: "24px",
      },
    },
    outlinedInputStyle: {
      inputRef: ref,
      onChange: onChange,
      type: type,
      label: label,
      placeholder: placeholder,
      required: "required",
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
          <FormControl {...styles().formContorolStyle}>
            <InputLabel htmlFor="outlined-adornment-email">ID</InputLabel>
            <OutlinedInput
              {...styles(emailRef, hideErrorMessage, "email", "ID", "e-mail")
                .outlinedInputStyle}
            />
          </FormControl>
          <FormControl {...styles().formContorolStyle}>
            <InputLabel htmlFor="outlined-adornment-password">
              PASSWORD
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              {...styles(
                passwordRef,
                hideErrorMessage,
                showPassword ? "text" : "password",
                "PASSWORD",
                "6文字以上入力してください",
                "e-mail"
              ).outlinedInputStyle}
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
