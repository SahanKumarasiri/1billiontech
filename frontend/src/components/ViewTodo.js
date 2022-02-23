import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./Button.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function ViewTodo() {
  const { type, id } = useParams(); //get the type and the id pass through the URL
  const [data, setData] = React.useState("");

  const history = useNavigate();

  var date = new Date();

  var plan_date = date.getDate();
  var plan_month = date.getMonth();
  var plan_year = date.getFullYear();

  const today = plan_date + "-" + (plan_month + 1) + "-" + plan_year;

  React.useEffect(() => { //component mount
    const getUnitTodo = async () => {
      await fetch(`/1billiontech/get/${id}`)
        .then((res) => res.json())
        .then((json) => setData(json))
        .catch();
    };
    getUnitTodo();
  });

  const markAsResolved = async (id) => { //method for resolved todo
    const resolved = true;
    const dateModified =
      today + " at " + date.getHours() + " : " + date.getMinutes();
    if (window.confirm("Do you want to mark as resolved !")) {
      await axios.put(`/1billiontech/resolve/${id}`, {
        resolved,
        dateModified,
      });
      await axios
        .get("/1billiontech/")
        .then((res) => setData(res.data))
        .catch((error) => alert(error));
      alert("Successfully Resolved !");
      history(`/dashboard/${localStorage.getItem("username")}`);
    }
  };

  const deleteTodo = async (id) => { //method for deleting todo
    if (window.confirm("Do you want to delete !")) {
      await axios.delete(`/1billiontech/delete/${id}`);
      await axios
        .get("/1billiontech/")
        .then((res) => setData(res.data))
        .catch((error) => alert(error));
      alert("Successfully Deleted !");
      history(`/dashboard/${localStorage.getItem("username")}`);
      window.location.reload();
    }
  };
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
              {type}'s {type === "Today" ? "Special" : "Events"}
            </h1>
          </div>
        </header>
        <br />
        <Card sx={{ maxWidth: 345 }}>
          {type === "Today" ? (
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="https://i.ibb.co/nzg2pRX/today.png"
            />
          ) : (
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="https://i.ibb.co/kHPgHyT/upcoming.png"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <span style={{ color: "orange", fontSize: "15px" }}>
                {localStorage.getItem("username")}{" "}
                {type === "Today"
                  ? ", Today you have to do 👇"
                  : ", This is your upcomming event 👇"} 
                  {/* conditional statement */}
              </span>
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {data.todo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.checkingDate}
            </Typography>
            <i
              className="fa fa-trash"
              aria-hidden="true"
              style={{
                color: "red",
                fontSize: "20px",
                marginRight: "20px",
              }}
              onClick={() => deleteTodo(id)}
            ></i>{" "}
            <Link
              to={`/dashboard/${localStorage.getItem("username")}/edit/${id}`}
            >
              <i
                className="fa fa-pencil"
                aria-hidden="true"
                style={{ color: "green", fontSize: "20px" }}
              ></i>
            </Link>
            <br />
            <button onClick={() => markAsResolved(id)}>
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-white">
                Mark as Resolved{" "}
                <i className="fa fa-flag-o" aria-hidden="true"></i>
              </span>
            </button>
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
