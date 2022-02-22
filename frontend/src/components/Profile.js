import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Button.css";

export default function Profile() {
  return (
    <div className="body">
      <center>
        <header
          className="bg-white shadow"
          style={{
            background: "#7b4397" /* fallback for old browsers */,
            background:
              "-webkit-linear-gradient(to right, #dc2430, #7b4397)" /* Chrome 10-25, Safari 5.1-6 */,
            background:
              "linear-gradient(to right, #dc2430, #7b4397)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
          }}
        >
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1
              className="text-3xl font-bold text-gray-900"
              style={{ color: "#f4f4f4", fontFamily: "cursive" }}
            >
              Your Profile 🥷🏻
            </h1>
          </div>
        </header>
        <br />
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image="https://i.ibb.co/dMxWb26/bot-removebg-preview.png"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <span style={{ color: "orange", fontSize: "15px" }}>
                You are currently Signin as 👇{" "}
              </span>
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {localStorage.getItem("username")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {localStorage.getItem("email")}
            </Typography>
          </CardContent>
        </Card>
        <br />
        <br />
        <br />

        <span style={{ color: "white" }}>{"Copyright © "}</span>
        <span style={{ color: "lightcoral" }}>Sahan Kumarasiri</span>
        <span style={{ color: "white" }}>
          {" " + new Date().getFullYear() + " . "}
        </span>
      </center>
    </div>
  );
}
