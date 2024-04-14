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
  TextField,
} from "@mui/material";
import { auth } from "../../firebase";
import CardComponent from "../../components/CardComponent";
import logo from "../../imeges/logo.svg";

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
        <Box component="form" onSubmit={handleSubmit} >
          <TextField
            inputRef={emailRef}
            {...textFieldStyle("email", "メールアドレス")}
          />
          <TextField
            inputRef={passwordRef}
            {...textFieldStyle("パスワード", "password")}
          />
          <Typography variant="body2" sx={{ mb: 1 }}>
            {errorMessage}
          </Typography>
          <ThemeProvider theme={darkTheme}>
            <Button type="submit" variant="contained" onSubmit={handleSubmit}>
              LOGIN
            </Button>
          </ThemeProvider>
          <Typography variant="body2" sx={{ mt: 2 }}>
            ユーザー登録は<Link to={"/signup"}>こちら</Link>
          </Typography>
        </Box>
      </CardComponent>
    </>
  );
}
