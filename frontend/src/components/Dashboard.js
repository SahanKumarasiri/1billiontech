import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredDataToday, setFilteredDataToday] = useState([]);
  const [filteredDataUpcomming, setFilteredDataUpcomming] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [initialClickedStatus, setInitialClickedStatus] = useState(false);

  var m_names = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );

  var date = new Date();

  var plan_date = date.getDate();
  var plan_month = date.getMonth();
  var plan_year = date.getFullYear();

  const today = plan_date + "-" + (plan_month + 1) + "-" + plan_year;

  useEffect(() => { //component mount
    const getData = async () => {
      await axios //axios a promised based HTTP API
        .get("/1billiontech/")
        .then((res) => {
          setData(res.data);
          setFilteredDataToday(
            res.data.filter(
              (el) =>
                el.email.indexOf(localStorage.getItem("email")) >= 0 && // create a filter condition according to the requirement
                el.resolved === false &&
                el.checkingDate.indexOf(today) >= 0
            )
          ); //set the filtered data
          setFilteredDataUpcomming(
            res.data.filter(
              (el) =>
                el.resolved === false && // create a filter condition according to the requirement
                el.email === localStorage.getItem("email") && //check for the browswer cache or local storage
                today !== el.checkingDate &&
                date.getFullYear() >= new Date(el.plannedDate).getFullYear() &&
                !(
                  date.getMonth() >= new Date(el.plannedDate).getMonth() &&
                  date.getDate() !== new Date(el.plannedDate).getDate() &&
                  date.getDate() > new Date(el.plannedDate).getDate()
                ) &&
                date.getMonth() <= new Date(el.plannedDate).getMonth()
            )
          );
        }) //set the filtered data
        .catch((error) => alert(error));
    };
    getData();
  },[]); //this renders only once [] dependency array

  const sortByDate = () => { //sorting method
    setInitialClickedStatus(true);
    setIsClicked(!isClicked);
    if (!isClicked) {
      setFilteredDataToday(
        data
          .sort((a, b) => (a.plannedDate > b.plannedDate ? 1 : -1)) //asc sort
          .filter(
            (el) =>
              el.email.indexOf(localStorage.getItem("email")) >= 0 &&
              el.resolved === false &&
              el.checkingDate.indexOf(today) >= 0
          )
      );
      setFilteredDataUpcomming(
        data
          .sort((a, b) => (a.plannedDate > b.plannedDate ? 1 : -1))
          .filter(
            (el) =>
              el.resolved === false &&
              el.email === localStorage.getItem("email") &&
              today !== el.checkingDate &&
              date.getFullYear() >= new Date(el.plannedDate).getFullYear() &&
              !(
                date.getMonth() >= new Date(el.plannedDate).getMonth() &&
                date.getDate() !== new Date(el.plannedDate).getDate() &&
                date.getDate() > new Date(el.plannedDate).getDate()
              ) &&
              date.getMonth() <= new Date(el.plannedDate).getMonth()
          )
      );
      setIsClicked(true);
    } else {
      setFilteredDataToday(
        data
          .sort((a, b) => (b.plannedDate > a.plannedDate ? 1 : -1)) //desc sort
          .filter(
            (el) =>
              el.email.indexOf(localStorage.getItem("email")) >= 0 &&
              el.resolved === false &&
              el.checkingDate.indexOf(today) >= 0
          )
      );
      setFilteredDataUpcomming(
        data
          .sort((a, b) => (b.plannedDate > a.plannedDate ? 1 : -1))
          .filter(
            (el) =>
              el.resolved === false &&
              el.email === localStorage.getItem("email") &&
              today !== el.checkingDate &&
              date.getFullYear() >= new Date(el.plannedDate).getFullYear() &&
              !(
                date.getMonth() >= new Date(el.plannedDate).getMonth() &&
                date.getDate() !== new Date(el.plannedDate).getDate() &&
                date.getDate() > new Date(el.plannedDate).getDate()
              ) &&
              date.getMonth() <= new Date(el.plannedDate).getMonth()
          )
      );
      setIsClicked(!isClicked);
    }
  };

  const markAsResolved = async (id, type) => { // method for mark the todos as resolved
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
        .then((res) => {
          setData(res.data);
          if (type === "today") {
            setFilteredDataToday(res.data.filter((el) => el.todo !== id));
            window.location.reload();
          } else {
            setFilteredDataUpcomming(res.data.filter((el) => el.todo !== id));
            window.location.reload();
          }
        })
        .catch((error) => alert(error));
    }
  };

  const deleteTodo = async (id, type) => { //method for deleting a todo
    if (window.confirm("Do you want to delete !")) {
      await axios.delete(`/1billiontech/delete/${id}`);
      await axios
        .get("/1billiontech/")
        .then((res) => {
          setData(res.data);
          if (type === "today") {
            setFilteredDataToday(res.data.filter((el) => el.todo !== id));
            window.location.reload();
          } else {
            setFilteredDataUpcomming(res.data.filter((el) => el.todo !== id));
            window.location.reload();
          }
        })
        .catch((error) => alert(error));
    }
  };
  return (
    <>
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
            Hello {localStorage.getItem("username")}{" "}
            <span className="wave-emoji">👋</span> Today's Special 😍
          </h1>
        </div>
      </header>
      <br />
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-1">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      To Do{" "}
                      <label
                        for="order"
                        style={{ textTransform: "lowercase", color: "red" }}
                      >
                        Change :
                      </label>
                      <input
                        type="submit"
                        value={isClicked === false ? "Date ASC" : "Date DESC"}
                        onClick={sortByDate}
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-500 text-white"
                      />
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      When
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                    >
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      &nbsp;
                      {initialClickedStatus === false
                        ? "Intially Sorted In No Ordering"
                        : isClicked === false
                        ? "You set the order to DECENDING"
                        : "You set the order to ACENDING"}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDataToday.length === 0 ? ( //conditional satement 
                    <center>
                      <h1 style={{ color: "red" }}>
                        Oops.. You don't have a plan today 😒{" "}
                      </h1>
                    </center>
                  ) : (
                    filteredDataToday.map((value) => { //mapping
                      if (
                        value.resolved === false &&
                        value.email === localStorage.getItem("email") && //check again for conditions to map
                        today === value.checkingDate
                      ) {
                        const compareDate = new Date(value.plannedDate);
                        const newStringDate =
                          m_names[compareDate.getDay()] +
                          " " +
                          compareDate.getDate() +
                          "-" +
                          (compareDate.getMonth() + 1) +
                          "-" +
                          compareDate.getFullYear();

                        return (
                          <tr key={value._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div
                                className="text-sm text-teal-600"
                                style={{
                                  display: "inline-flex",
                                  justifyContent: "space-around",
                                }}
                              >
                                <Link
                                  to={`/dashboard/${localStorage.getItem(
                                    "username"
                                  )}/view/${"Today"}/${value._id}`}
                                >
                                  <div>{value.todo} </div>
                                  <div>
                                    <i
                                      className="fa fa-eye"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                </Link>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {newStringDate}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {" "}
                                Active&nbsp;
                                <i
                                  className="fa fa-circle"
                                  aria-hidden="true"
                                  style={{ color: "red" }}
                                ></i>
                              </span>
                              &nbsp;
                              <button
                                onClick={() =>
                                  markAsResolved(value._id, "today")
                                }
                              >
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-white">
                                  Mark as Resolved&nbsp;
                                  <i
                                    className="fa fa-flag-o"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="text-sm text-gray-500">
                                Created : {value.dateCreated}
                              </div>
                              <div className="text-sm text-gray-500">
                                Last Modified : {value.dateModified}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a className="text-indigo-600 hover:text-indigo-900">
                                <i
                                  className="fa fa-trash"
                                  aria-hidden="true"
                                  style={{
                                    color: "red",
                                    fontSize: "20px",
                                    marginRight: "20px",
                                  }}
                                  onClick={() => deleteTodo(value._id, "today")}
                                ></i>{" "}
                                <Link
                                  to={`/dashboard/${localStorage.getItem(
                                    "username"
                                  )}/edit/${value._id}`}
                                >
                                  <i
                                    className="fa fa-pencil"
                                    aria-hidden="true"
                                    style={{ color: "green", fontSize: "20px" }}
                                  ></i>
                                </Link>
                              </a>
                            </td>
                          </tr>
                        );
                      }
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />

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
            Upcomming Events 🎈
          </h1>
        </div>
      </header>
      <br />
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-1">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      To Do{" "}
                      <label
                        for="order"
                        style={{ textTransform: "lowercase", color: "red" }}
                      >
                        Change :
                      </label>
                      <input
                        type="submit"
                        value={isClicked === false ? "Date ASC" : "Date DESC"}
                        onClick={sortByDate}
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-500 text-white"
                      />
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      When
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                    >
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                      &nbsp;
                      {initialClickedStatus === false
                        ? "Intially Sorted In No Ordering"
                        : isClicked === false
                        ? "You set the order to DECENDING"
                        : "You set the order to ACENDING"}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDataUpcomming.length === 0 ? ( //conditional statement
                    <center>
                      <h1 style={{ color: "red" }}>
                        Oops... You don't have upcomming plannings 😒{" "}
                      </h1>
                    </center>
                  ) : (
                    filteredDataUpcomming.map((value) => { //mapping
                      const compareDate = new Date(value.plannedDate);
                      if (
                        value.resolved === false &&
                        value.email === localStorage.getItem("email") && //check by the conditions to map
                        today !== value.checkingDate &&
                        date.getFullYear() >= compareDate.getFullYear() &&
                        !(
                          date.getMonth() >= compareDate.getMonth() &&
                          date.getDate() !== compareDate.getDate() &&
                          date.getDate() > compareDate.getDate()
                        ) &&
                        date.getMonth() <= compareDate.getMonth()
                      ) {
                        const newStringDate =
                          m_names[compareDate.getDay()] +
                          " " +
                          compareDate.getDate() +
                          "-" +
                          (compareDate.getMonth() + 1) +
                          "-" +
                          compareDate.getFullYear();
                        return (
                          <tr key={value._id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div
                                className="text-sm text-teal-600"
                                style={{
                                  display: "inline-flex",
                                  justifyContent: "space-around",
                                }}
                              >
                                <Link
                                  to={`/dashboard/${localStorage.getItem(
                                    "username"
                                  )}/view/${"Upcomming"}/${value._id}`}
                                >
                                  <div>{value.todo} </div>
                                  <div>
                                    <i
                                      className="fa fa-eye"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                </Link>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {newStringDate}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {" "}
                                Active&nbsp;
                                <i
                                  className="fa fa-circle"
                                  aria-hidden="true"
                                  style={{ color: "red" }}
                                ></i>
                              </span>
                              <button
                                onClick={() =>
                                  markAsResolved(value._id, "upcomming")
                                }
                              >
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-white">
                                  Mark as Resolved&nbsp;
                                  <i
                                    className="fa fa-flag-o"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="text-sm text-gray-500">
                                Created : {value.dateCreated}
                              </div>
                              <div className="text-sm text-gray-500">
                                Last Modified : {value.dateModified}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a className="text-indigo-600 hover:text-indigo-900">
                                <i
                                  className="fa fa-trash"
                                  aria-hidden="true"
                                  style={{
                                    color: "red",
                                    fontSize: "20px",
                                    marginRight: "20px",
                                  }}
                                  onClick={() =>
                                    deleteTodo(value._id, "upcomming")
                                  }
                                ></i>{" "}
                                <Link
                                  to={`/dashboard/${localStorage.getItem(
                                    "username"
                                  )}/edit/${value._id}`}
                                >
                                  <i
                                    className="fa fa-pencil"
                                    aria-hidden="true"
                                    style={{ color: "green", fontSize: "20px" }}
                                  ></i>
                                </Link>
                              </a>
                            </td>
                          </tr>
                        );
                      }
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <center>
        <br />
        <span style={{ color: "white" }}>{"Copyright © "}</span>
        <span style={{ color: "lightcoral" }}>Sahan Kumarasiri</span>
        <span style={{ color: "white" }}>
          {" " + new Date().getFullYear() + " . "}
        </span>
      </center>
    </>
  );
};

export default Dashboard;
