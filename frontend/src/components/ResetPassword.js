import React, { lazy, Suspense, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Logo from "./logo.png";

import Copyright from "./Copyright";
import axios from "axios";
import { useParams } from "react-router-dom";

const RandomImage = lazy(() => import("./RandomImage")); //lazy load the component : dynamic import

const theme = createTheme();

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { resetToken } = useParams();

  const resetPasswordHandler = async (e) => { //handler for the reset password
    e.preventDefault(); 

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) { //check the password matching
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);

      return setError("Password did not match");
    }

    try {
      const { data } = await axios.put(
        `/api/auth/passwordreset/${resetToken}`,
        { password },
        config
      );

      setSuccess(data.verify);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000); //5s
    }
  };
  let rpassword = null;
  let rnewpassword = null;

  const onKeyUp = (e, target) => {
    if (e.keyCode === 13) { //references for the input fields
      switch (target) {
        case "password":
          rnewpassword.focus();
          break;
        default:
          rpassword.focus();
          break;
      }
    }
  };
  return (
    <form onSubmit={resetPasswordHandler}>
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
                Change Password
              </Button>
              {error && <span style={{ color: "red" }}>{error}</span>}
              {success && <span style={{ color: "green" }}>{success}</span>}
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
                name="password"
                label="Confirm Password"
                type="password"
                id="password"
                placeholder="Confirm Password"
                ref={(input) => {
                  rnewpassword = input;
                }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <span>
                  <i className="fa fa-cogs" aria-hidden="true"></i> Reset
                </span>
              </Button>
              <Grid container>
                <Grid item xs>
                  <a href={"/login"}>{"Do you have have an account? Sign In"}</a>
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

export default ResetPassword;
