import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const Dashboard = () => {
  const history = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      //push a user if he already logged in
      history("/login");
    }
  }, []); //dependency array

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history("/login");
  };
  return (
    <div>
      <NavBar />
      <button onClick={logoutHandler} style={{ color: "white" }}>
        {" "}
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
