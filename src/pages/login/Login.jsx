import { React, useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth } from "../../firebase";
import CardComponent from "../../components/CardComponent";
import logo from "../../imeges/logo.svg";
import { InfoBasicAlert, WarningBasicAlert } from "../../components/BasicAlert";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "onChange" });

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

  const handleLogin = async (e) => {
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
        setErrorMessage("メールアドレスまたはパスワードが一致しません。");
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

  // スタイル属性
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
        {errorMessage && (
          <Box sx={{ margin: "0 auto 20px auto" }}>
            <WarningBasicAlert message={errorMessage} />
          </Box>
        )}
        <Box component="form" onSubmit={handleSubmit(handleLogin)}>
          <FormControl {...styles.formContorolStyle}>
            <InputLabel htmlFor="outlined-adornment-email">ID</InputLabel>
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
          </FormControl>
          <FormControl {...styles.formContorolStyle}>
            <InputLabel htmlFor="outlined-adornment-password">
              PASSWORD
            </InputLabel>
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
