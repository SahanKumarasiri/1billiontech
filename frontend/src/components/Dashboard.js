import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      Dashboard
      <button onClick={logoutHandler} style={{color:"white"}}> Logout</button>
    </div>
  );
};

export default Dashboard;
