import React, { lazy, Suspense, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Copyright from "./Copyright";
import Logo from "./logo.png";

const RandomImage = lazy(() => import("./RandomImage"));

const theme = createTheme();

const Register = () => {
  const history = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); //additional
  const [isError, setIsError] = useState(false);

  const registerHandler = async (e) => { //register handler method
    e.preventDefault(); 

    setLoading(true);
    setIsError(false); //additional

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) { //method for cheking the password an confirm password
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
      setIsError(true);
      setTimeout(() => {
        setError("");
      }, 5000);

      return setError("Password did not match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        { username, email, password },
        config
      );

      localStorage.setItem("authToken", data.token); //set the data to the browswer local storage
      localStorage.setItem("email", data.email);
      localStorage.setItem("username", data.username);

      setTimeout(() => {
        setLoading(false);
        history("/login"); // after 5seconds it will redirect to the login
      }, 5000); //5s
    } catch (error) {
      setError(error.response.data.error);
      setLoading(false);
      setIsError(true);
      setTimeout(() => {
        setError("");
      }, 5000); //5s
    }
  };

  let remail = null;
  let rpassword = null;
  let rusername = null;
  let rrepassword = null;

  const onKeyUp = (e, target) => { //references for the input fileds
    if (e.keyCode === 13) {
      switch (target) {
        case "username":
          remail.focus();
          break;
        case "email":
          rpassword.focus();
          break;
        case "password":
          rrepassword.focus();
          break;
        default:
          rusername.focus();
          break;
      }
    }
  };
  return (
    <form onSubmit={registerHandler}>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Suspense fallback={<div>Loading...</div>}>
            <RandomImage />
          </Suspense>

          <Grid item xs={12} sm={8} md={5} elevation={6} square="true">
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={Logo} style={{ width: "50%" }} />
              <Button component="h1" variant="h5">
                Sign Up
              </Button>
              {error && (
                <span className="error-message" style={{ color: "red" }}>
                  {error}
                </span>
              )}{" "}
              {/*ternary operator*/}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                name="username"
                autoComplete="username"
                placeholder="Enter Username"
                autoFocus
                ref={(input) => {
                  rusername = input;
                }}
                onKeyUp={(e) => onKeyUp(e, "username")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter Email"
                ref={(input) => {
                  remail = input;
                }}
                onKeyUp={(e) => onKeyUp(e, "email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                placeholder="Enter Password"
                ref={(input) => {
                  rpassword = input;
                }}
                onKeyUp={(e) => onKeyUp(e, "password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="repassword"
                label="Confirm-Password"
                type="password"
                id="password"
                placeholder="Enter Password"
                ref={(input) => {
                  rrepassword = input;
                }}
                onKeyUp={(e) => onKeyUp(e, "repassword")}
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {isError && (
                <small className="mt-3 d-inline-block text-danger">
                  Something went wrong. Please try again later.
                </small>
              )}
              {/*decision*/}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                <span>
                  <i className="fa fa-user-plus" aria-hidden="true"></i>{" "}
                  {loading ? "Registering in Progress..." : "Sign Up"}
                </span>
              </Button>
              <Grid container>
                <Grid item>
                  <Link to={"/login"}>
                    {"Already have an account? Sign in"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </form>
  );
};

export default Register;
