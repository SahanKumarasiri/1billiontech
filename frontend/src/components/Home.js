import React from "react";
import "./Home.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Home = () => {
  const history = useNavigate();
  const onClick = () => {
    history(`/dashboard/${localStorage.getItem("username")}/create`);
    window.location.reload();
  };
  return (
    <>
      <div className="site-mobile-menu site-navbar-target">
        <div className="site-mobile-menu-header">
          <div className="site-mobile-menu-close mt-3">
            <span className="icon-close2 js-menu-toggle"></span>
          </div>
        </div>
        <div className="site-mobile-menu-body"></div>
      </div>
      <header className="site-navbar mt-3">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="site-logo col-6">
              <a href="index.html">Todo List</a>
            </div>

            <nav className="mx-auto site-navigation">
              <ul className="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
                <li>
                  <NavLink to="/" className="nav-link active">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/about"}>About</NavLink>
                </li>
                <li className="has-children">
                  <a>Listings</a>
                  <ul className="dropdown">
                    <li>
                      <a
                        href="http://www.sahan-kumarasiri.online/"
                        target={"_blank"}
                      >
                        <i class="fa fa-graduation-cap" aria-hidden="true"></i>{" "}
                        Portfolio
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/SahanKumarasiri"
                        target={"_blank"}
                      >
                        <i
                          className="fa fa-github"
                          aria-hidden="true"
                          style={{ color: "black" }}
                        ></i>{" "}
                        Github
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="d-lg-none">
                  <NavLink to="/login">Log In</NavLink>
                </li>
              </ul>
            </nav>

            <div className="right-cta-menu text-right d-flex aligin-items-center col-6">
              <div className="ml-auto">
                <NavLink
                  to={`/dashboard/${localStorage.getItem("username")}/create`}
                  className="btn btn-outline-white border-width-2 d-none d-lg-inline-block"
                  onClick={onClick}
                >
                  <span className="mr-2 icon-add"></span>Create a Todo
                </NavLink>{" "}
                <NavLink
                  to="/login"
                  className="btn btn-primary border-width-2 d-none d-lg-inline-block"
                >
                  <span className="mr-2 icon-lock_outline"></span>Log In
                </NavLink>
              </div>
              <a
                href="#"
                className="site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"
              >
                <span className="icon-menu h3 m-0 p-0 mt-2"></span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div
        className="hero"
        style={{ backgroundImage: "url('assets/images/logo2.jpg')" }}
      >
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <center>
          <div id="container">
            <Link to="/login">
              <button className="learn-more" style={{ width: "30%" }}>
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <h1 className="button-text">Get Started</h1>
              </button>
            </Link>
          </div>
        </center>
      </div>
    </>
  );
};

export default Home;
