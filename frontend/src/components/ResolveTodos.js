import React, { useEffect, useState } from "react";
import axios from "axios";

const ResolveTodos = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await axios
        .get("/1billiontech/")
        .then((res) => setData(res.data))
        .catch((error) => alert(error));
    };
    getData();
  });

  var m_names = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );

  var filteredData = data.filter(
    (el) => el.email.indexOf(localStorage.getItem("email")) >= 0
  );

  const changeOrder = async () => {
    if (window.confirm("Hello")) {
      filteredData = data.filter((el) => el.todo.indexOf("sdfdsf"));
    }
  };

  const deleteTodo = async (id) => {
    if (window.confirm("Do you want to delete !")) {
      await axios.delete(`/1billiontech/delete/${id}`);
      await axios
        .get("/1billiontech/")
        .then((res) => setData(res.data))
        .catch((error) => alert(error));
      filteredData = data.filter((el) => el.todo !== id);
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
            Resolved Todos 👌
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
                        Sort By :
                      </label>
                      <button value="date" onClick={changeOrder}>
                        Date
                      </button>
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
                  {filteredData.length === 0 ? (
                    <center>
                      <h1 style={{ color: "red" }}>No resolved todos 😒 </h1>
                    </center>
                  ) : (
                    filteredData.map((value) => {
                      if (
                        value.resolved === true &&
                        value.email === localStorage.getItem("email")
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
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-500 text-white">
                                {" "}
                                Resolved&nbsp;
                                <i
                                  className="fa fa-check-circle"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="text-sm text-gray-500">
                                Created : {value.dateCreated}
                              </div>
                              <div className="text-sm text-gray-500">
                                Resolved Date : {value.dateModified}
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
    </>
  );
};

export default ResolveTodos;
