import React, { lazy, Suspense, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Link } from "react-router-dom";
import Copyright from "./Copyright";
import axios from "axios";

import Logo from "./logo.png";

const RandomImage = lazy(() => import("./RandomImage"));

const theme = createTheme();

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => { //method for forgot password handling
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
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
  return (
    <form onSubmit={forgotPasswordHandler}>
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
                Forgot Password
              </Button>
              <p style={{ color: "red" }}>
                Please enter the email address you register your account with.
                We will send you reset password confirmation to this email. 😍
              </p>
              {error && (
                <span className="badge bg-warning" style={{ color: "white" }}>
                  {error}
                </span>
              )}
              {success && (
                <span className="badge bg-success" style={{ color: "white" }}>
                  {success}
                </span>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                placeholder="Enter Email"
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <span>
                  <i class="fa fa-paper-plane" aria-hidden="true"></i> Request
                </span>
              </Button>
              <Grid container>
                <Grid item>
                  <Link to={"/login"}>
                    {"Do you have have an account? Sign In"}
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

export default ForgotPassword;
