import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import "./App.css";

import PrivateRoute from "./components/routes/PrivateRoute";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import CreateTodo from "./components/CreateTodo";
import Profile from "./components/Profile";
import ResolveTodos from "./components/ResolveTodos";

const App = () => {
  // The back-to-top button is hidden at the beginning
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/passwordreset/:resetToken"
            element={<ResetPassword />}
          />
          <Route
            path="/dashboard/:name"
            element={
              <PrivateRoute>
                <NavBar />
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/:name/create"
            element={
              <PrivateRoute>
                <NavBar />
                <CreateTodo />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/:name/profile"
            element={
              <PrivateRoute>
                <NavBar />
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/:name/resolve"
            element={
              <PrivateRoute>
                <NavBar />
                <ResolveTodos />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      <>
        {/* React Fragment */}
        {showButton && (
          <button onClick={scrollToTop} className="back-to-top">
            <i class="fa fa-arrow-circle-up" aria-hidden="true"></i>
          </button>
        )}
        {/* &#8679; is used to create the upward arrow */}
      </>
    </>
  );
};

export default App;
