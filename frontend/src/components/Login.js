import React, { lazy, Suspense, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Logo from "./logo.png";

import { Link } from "react-router-dom";
import Copyright from "./Copyright";

const RandomImage = lazy(() => import("./RandomImage")); //lazy loading component import: dynamic import

const theme = createTheme();

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [available, setAvailable] = useState("");
  const [loading, setLoading] = useState(false); //additional
  const [isError, setIsError] = useState(false);

  const history = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      //push a user if he already logged in
      if (
        window.confirm(
          "You are already logged in ! Are you sure you want to proceed?"
        )
      ) {
        history(`/dashboard/${localStorage.getItem("username")}`); // if true navigate to the dashboard
        window.location.reload();
      } else {
        if (window.confirm("Do you need to signout ?")) { //if true clear the brower caching and signout
          localStorage.removeItem("authToken");
          localStorage.removeItem("username");
          localStorage.removeItem("email");
          history("/login");
          alert("You are successfully signed out");
        } else {
          history(`/dashboard/${localStorage.getItem("username")}`); //else redirect to the dashboard
          window.location.reload();
        }
      }
    }
  }, []);

  const loginHandler = async (e) => { //handler method for login
    e.preventDefault();

    setLoading(true);
    setIsError(false); //additional

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token); //set the browser caching or local storage for globally accessed anywhere in the application
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);

      setTimeout(() => { // set a 5seconds timeout for authentication
        setLoading(false);
        history(`/dashboard/${data.username}`);
        window.location.reload();
      }, 5000);
    } catch (error) {
      setError(error.response.data.error);
      setAvailable(error.response.data.available);
      setLoading(false);
      setIsError(true);
      setTimeout(() => {
        setError("");
        setAvailable("");
      }, 5000); //5s
    }
  };

  const showPassword = () => { //show password method when check box is enabled
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  let refemail = null;
  let refpassword = null;

  const onKeyUp = (e, target) => { //references for the input fields
    if (e.keyCode === 13) { // check the key code. ENTER button is 13
      switch (target) {
        case "email":
          refpassword.focus();
          break;
        default:
          refemail.focus();
          break;
      }
    }
  };
  return (
    <form onSubmit={loginHandler}>
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
                Sign in
              </Button>
              <p>
                {error && (
                  <span className="badge bg-warning" style={{ color: "white" }}>
                    {error}
                  </span>
                )}
                {available && (
                  <span className="badge bg-danger" style={{ color: "white" }}>
                    {available}
                  </span>
                )}
              </p>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter Email"
                autoFocus
                ref={(input) => {
                  refemail = input;
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
                  refpassword = input;
                }}
                onKeyUp={(e) => onKeyUp(e, "password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <label className="float-left form-check-label">
                <input type="checkbox" onClick={showPassword} /> Show Password{" "}
                <i class="fa fa-rss" aria-hidden="true"></i>
              </label>
              <br />
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
                  <i className="fa fa-sign-in" aria-hidden="true"></i>{" "}
                  {loading ? "Authenticating..." : "Sign In"}
                </span>
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to={"/forgotpassword"}>Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to={"/register"}>
                    {"Don't have an account? Sign Up"}
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

export default Login;
