import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import "./Button.css";
import { Button, Stack } from "@mui/material";


export default function About() {
  return (
    <div className="body">
      <center>
        <br />

        <Stack direction="row" spacing={2}>
          &nbsp; &nbsp;
          <a href="/">
            <Button variant="contained" color="success">
              <i class="fa fa-home" aria-hidden="true"></i>&nbsp; Home
            </Button>
          </a>
        </Stack>
        <br />

        <Card sx={{ display: "inline-table", justifyContent: "space-around" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                Live From Space :{" "}
                <a href="http://www.sahan-kumarasiri.online/" target={"_blank"}>
                  @SahanKumarasiri
                </a>
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                <h1 style={{ fontSize: "50px" }}>
                  <a
                    href="https://github.com/SahanKumarasiri"
                    target={"_blank"}
                  >
                    <i
                      className="fa fa-github"
                      aria-hidden="true"
                      style={{ color: "black" }}
                    ></i>
                  </a>
                  &nbsp;
                  <a
                    href="https://www.linkedin.com/in/sahankumarasiri"
                    target={"_blank"}
                  >
                    <i
                      className="fa fa-linkedin-square"
                      aria-hidden="true"
                      style={{ color: "blue" }}
                    ></i>
                  </a>
                  &nbsp;
                  <a
                    href="https://medium.com/@SahanKumarasiri"
                    target={"_blank"}
                  >
                    <i className="fa fa-medium" aria-hidden="true"></i>
                  </a>
                </h1>
              </Typography>
            </CardContent>
            <Box
              sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
            ></Box>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image="https://i.ibb.co/86qpJKq/Whats-App-Image-2021-10-04-at-16-15-32.jpg"
            alt="Live from space album cover"
          />
          <br />
          <center>
            <div>
              <span style={{ color: "black" }}>{"Copyright © "}</span>
              <span style={{ color: "lightcoral" }}>Sahan Kumarasiri</span>
              <span style={{ color: "black" }}>
                {" " + new Date().getFullYear() + " . "}
              </span>
            </div>
          </center>
          <br />
        </Card>
        <img src="https://i.ibb.co/THqQVQ1/logo.png" style={{ width: "20%" }} />
      </center>
    </div>
  );
}
