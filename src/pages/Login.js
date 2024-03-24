import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "../css/Login.css";
import { AppBar, Toolbar } from "@mui/material";
import CardComponent from "../components/CardComponent";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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

  return (
    <>
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
        title={"LOGIN"}
        width={{ xs: "84%", md: "50%" }}
        margin={"50px auto"}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
          <TextField
            required
            type="email"
            label="メールアドレス"
            variant="outlined"
            inputRef={emailRef}
            fullWidth
            size="small"
            margin="normal"
          />
          <TextField
            required
            label="パスワード"
            type="password"
            variant="outlined"
            inputRef={passwordRef}
            size="small"
            fullWidth
            margin="normal"
          />
          <Typography variant="body2" sx={{ mb: 1 }}>
            {errorMessage}
          </Typography>
          <Button type="submit" variant="contained" onSubmit={handleSubmit}>
            login
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            ユーザー登録は<Link to={"/signup"}>こちら</Link>
          </Typography>
        </Box>
      </CardComponent>
    </>
  );
}
