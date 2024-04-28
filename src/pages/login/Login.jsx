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
            <OutlinedInput placeholder="登録済みのメールアドレス" inputRef={emailRef} type="email" label="ID" />
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
