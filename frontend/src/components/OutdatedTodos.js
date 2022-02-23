import React, { useEffect, useState } from "react";
import axios from "axios";

const OutdatedTodos = () => {
  const [filteredOutdated, setFilteredOutdated] = useState([]);

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
      await axios
        .get("/1billiontech/")
        .then((res) =>
          setFilteredOutdated(
            res.data
              .sort((a, b) => (a.plannedDate > b.plannedDate ? 1 : -1))
              .filter(
                (el) =>
                  el.resolved === false &&
                  el.email.indexOf(localStorage.getItem("email")) >= 0 &&
                  today !== el.checkingDate &&
                  date.getFullYear() >=
                    new Date(el.plannedDate).getFullYear() &&
                  !!(
                    date.getMonth() >= new Date(el.plannedDate).getMonth() &&
                    date.getDate() !== new Date(el.plannedDate).getDate() &&
                    date.getDate() > new Date(el.plannedDate).getDate()
                  ) &&
                  date.getMonth() <= new Date(el.plannedDate).getMonth()
              )
          )
        )
        .catch((error) => alert(error));
    };
    getData();
  });

  const deleteTodo = async (id) => { //method for delete todo
    if (window.confirm("Do you want to delete !")) {
      await axios.delete(`/1billiontech/delete/${id}`);
      await axios
        .get("/1billiontech/")
        .then((res) => {
          setFilteredOutdated(res.data.filter((el) => el.todo !== id));
          window.location.reload();
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
            Outdated Todos ☹️
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
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOutdated.length === 0 ? (
                    <center>
                      <h1 style={{ color: "red" }}>No outdated todos 😒 </h1>
                    </center>
                  ) : (
                    filteredOutdated.map((value) => {
                      const compareDate = new Date(value.plannedDate);
                      if (
                        value.resolved === false &&
                        value.email === localStorage.getItem("email") &&
                        date.getFullYear() >= compareDate.getFullYear() &&
                        !(
                          !(
                            date.getMonth() >= compareDate.getMonth() &&
                            date.getDate() !== compareDate.getDate() &&
                            date.getDate() > compareDate.getDate()
                          ) && date.getMonth() <= compareDate.getMonth()
                        )
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
                              <div className="text-sm text-gray-900">
                                {value.todo}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {newStringDate}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-500 text-white">
                                {" "}
                                Outdated&nbsp;
                                <i
                                  className="fa fa-times-circle"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="text-sm text-gray-500">
                                Created : {value.dateCreated}
                              </div>
                              <div className="text-sm text-gray-500">
                                Modified Date : {value.dateModified}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                <i
                                  className="fa fa-trash"
                                  aria-hidden="true"
                                  style={{
                                    color: "red",
                                    fontSize: "20px",
                                    marginRight: "20px",
                                  }}
                                  onClick={() => deleteTodo(value._id)}
                                ></i>{" "}
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
        <br />
        <div>
          <span style={{ color: "white" }}>{"Copyright © "}</span>
          <span style={{ color: "lightcoral" }}>Sahan Kumarasiri</span>
          <span style={{ color: "white" }}>
            {" " + new Date().getFullYear() + " . "}
          </span>
        </div>
      </center>
    </>
  );
};

export default OutdatedTodos;
