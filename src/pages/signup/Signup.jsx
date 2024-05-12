import { React, useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
  FormHelperText,
} from "@mui/material";
import { auth } from "../../firebase";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

  // パスワードを表示
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  // エラーメッセージが表示された後に再入力をするとき、メッセージを非表示にする
  const hideErrorMessage = (e) => {
    console.log(e);
    setErrorMessage("");
  };

  // SIGNUPボタンを押した時の処理
  const handleSignup = async (e) => {
    try {
      await createUserWithEmailAndPassword(auth, e.accountId, e.password);
      alert("サインアップが完了しました");
      navigate("/home");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setErrorMessage("このメールアドレスはすでに登録されています");
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

  const styles = {
    formContorolStyle: {
      variant: "outlined",
      size: "small",
      fullWidth: "fullWidth",
      sx: {
        mb: 2,
      },
    },
    idFormStyle: {
      id: "accountId",
      name: "accountId",
      label: "ID",
      type: "email",
      variant: "outlined",
      size: "small",
      inputRef: emailRef,
      onChange: hideErrorMessage,
      required: "required",
      error: !errors.accountId || !errorMessage === null ? "" : "error",
    },
    passwordFormStyle: {
      id: "password",
      name: "password",
      label: "PASSWORD",
      type: showPassword ? "text" : "password",
      variant: "outlined",
      size: "small",
      inputRef: passwordRef,
      required: "required",
      error: errors.password && "error",
    },
  };

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
        <Box component="form" onSubmit={handleSubmit(handleSignup)}>
          <FormControl {...styles.formContorolStyle}>
            <InputLabel htmlFor="accountId">ID</InputLabel>
            <OutlinedInput
              {...register("accountId", {
                required: {
                  value: true,
                  message: "メールアドレスを入力してください。",
                },
                pattern: {
                  value:
                    /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                  message: "name@example.comの形式で入力してください",
                },
              })}
              {...styles.idFormStyle}
            />
            {errors.accountId?.types?.required && (
              <FormHelperText error>
                {errors.accountId.types.required}
              </FormHelperText>
            )}
            {errors.accountId?.types?.pattern && (
              <FormHelperText error>
                {errors.accountId.types.pattern}
              </FormHelperText>
            )}
            {errorMessage && (
              <FormHelperText error>{errorMessage}</FormHelperText>
            )}
          </FormControl>
          <FormControl {...styles.formContorolStyle}>
            <InputLabel htmlFor="password">PASSWORD</InputLabel>
            <OutlinedInput
              {...register("password", {
                required: {
                  value: true,
                  message: "パスワードを入力してください",
                },
                pattern: {
                  value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
                  message:
                    "パスワードは6文字以上、半角英数字を含むように入力してください",
                },
              })}
              {...styles.passwordFormStyle}
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
            {!errors.password ? (
              <FormHelperText>6文字以上、半角英数字を含む</FormHelperText>
            ) : (
              <>
                {errors.password?.types?.required && (
                  <FormHelperText error>
                    {errors.password.types.required}
                  </FormHelperText>
                )}
                {errors.password?.types?.pattern && (
                  <FormHelperText error>
                    {errors.password.types.pattern}
                  </FormHelperText>
                )}
              </>
            )}
          </FormControl>
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
