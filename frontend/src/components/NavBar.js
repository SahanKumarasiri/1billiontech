import React, { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./Button.css";

const NavBar = () => {
  const history = useNavigate();
  const { name } = useParams();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      //push a user if he already logged in
      history("/login");
      window.location.reload();
    }
  }, []); //dependency array

  const logoutHandler = () => { //handler for the log out
    localStorage.removeItem("authToken"); //remove the local storage caches
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    history("/login"); // and then redirected to the login
    window.location.reload();
  };
  return (
    <div className="body">
      <nav className="flex items-center justify-between flex-wrap bg-black-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <NavLink to={`/dashboard/${localStorage.getItem("username")}`}>
            <span className="font-semibold text-xl tracking-tight">
              Dashboard
            </span>
          </NavLink>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <NavLink
              to={`/dashboard/${localStorage.getItem("username")}/create`}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              <i className="fa fa-plus-circle" aria-hidden="true"></i> Create
            </NavLink>
            <NavLink
              to={`/dashboard/${localStorage.getItem("username")}/resolve`}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              <i className="fa fa-check-circle" aria-hidden="true"></i> Resolved
            </NavLink>
            <NavLink
              to={`/dashboard/${localStorage.getItem("username")}/outdated`}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              <i class="fa fa-question-circle" aria-hidden="true"></i> Outdated
            </NavLink>
            <NavLink
              to={`/dashboard/${localStorage.getItem("username")}/profile`}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              <i className="fa fa-user" aria-hidden="true"></i> Profile
            </NavLink>
          </div>
          <div className="ml-3 relative" style={{ marginRight: "10px" }}>
            <div>
              <NavLink
                to={`/dashboard/${localStorage.getItem("username")}/profile`}
              >
                <button
                  type="button"
                  class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  title={"Hello " + name}
                >
                  <p style={{ padding: "12px", color: "white" }}>
                    {name.substring(0, 1)}
                  </p>
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        <div onClick={logoutHandler}>
          <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-green-900 mt-4 lg:mt-0">
            Sign Out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
