import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import React, { useState , useEffect} from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; //for toast messages
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

import "./Button.css";

const EditTodo = () => {
  var m_names = new Array( //get date for the database saving
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  );

  var today = new Date();
  var curr_date = today.getDate();
  var curr_month = today.getMonth();
  var curr_year = today.getFullYear();
  var hour = today.getHours();
  var min = today.getMinutes();

  today =
    m_names[curr_month] +
    " " +
    curr_date +
    "/ " +
    curr_year +
    " " +
    hour +
    " : " +
    min;

  const { id } = useParams();

  const [value, setValue] = useState(new Date());
  const [todo, setTodo] = useState("");
  const dateModified = today;

  const [loading, setLoading] = useState(false); //additional

  const [plannedDate, setPlannedDate] = useState(value);

  useEffect(() => { //component mount
    const getTodo = async () => {
      await fetch(`/1billiontech/get/${id}`)
        .then((res) => res.json())
        .then((json) => {
          setValue(json.plannedDate);
          setTodo(json.todo);
        })
        .catch((err) => alert(err));
    };
    getTodo();
  }, []);

  const editTodoHandler = async (e) => { //method for updating the data to the db
    e.preventDefault();

    setLoading(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put(
        `/1billiontech/update/${id}`,
        {
          todo,
          plannedDate,
          dateModified,
        },
        config
      );

      setTimeout(() => { //se a 5seconds timeout
        setLoading(false);
        toast("Success! Todo Updated 😘");
        setValue(new Date());
        setTodo("");
        window.location.reload();
      }, 5000);
    } catch (error) {
      alert(error.response.data.error);
      setValue(new Date());
      setTodo("");
      setLoading(false);
    }
  };

  const handleChange = (newValue) => { //event for date picker
    setValue(newValue);
    setPlannedDate(newValue);
  };

  return (
    <div className="body">
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
            <span className="wave-emoji">👋</span> Edit Your Todo 😍
          </h1>
        </div>
      </header>
      <main>
        <form onSubmit={editTodoHandler}>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                <center>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <h1 style={{ color: "white", fontSize: "40px" }}>
                    <i className="fa fa-plus" aria-hidden="true"></i> Change
                    Your Future
                  </h1>
                  <br />

                  <div
                    style={{
                      display: "inline-flex",
                      justifyContent: "space-around",
                    }}
                    className="container"
                  >
                    <div>
                      <TextField
                        id="filled-basic"
                        label="Write your work 😘"
                        variant="filled"
                        InputLabelProps={{
                          sx: {
                            // set the color of the label when not shrinked
                            color: "green",
                          },
                        }}
                        inputProps={{
                          sx: {
                            // set the color of the label when not shrinked
                            color: "white",
                          },
                        }}
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <span style={{ color: "yellow" }}>
                        When you wish to do it 🤔
                      </span>
                    </div>
                    <div>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <div style={{ width: "100%" }}>
                            <DesktopDatePicker
                              inputFormat="dd/MM/yyyy"
                              inputProps={{
                                sx: {
                                  // set the color of the label when not shrinked
                                  color: "white",
                                },
                                readOnly: true,
                              }}
                              value={value}
                              onChange={handleChange}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  sx={{
                                    svg: { color: "#ffffff" },
                                    inpt: { color: "#ffffff" },
                                    label: { color: "#ffffff" },
                                  }}
                                />
                              )}
                              required
                            />
                          </div>
                        </Stack>
                      </LocalizationProvider>
                    </div>
                  </div>
                  <button className="animated-button1" disabled={loading}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <i className="fa fa-cogs" aria-hidden="true"></i>{" "}
                    {loading ? "Changing in Progess..." : "Edit"}
                  </button>
                  <ToastContainer style={{ marginTop: "50px" }} />
                </center>
              </div>
            </div>
            <center>
              <div>
                <span style={{ color: "white" }}>{"Copyright © "}</span>
                <span style={{ color: "lightcoral" }}>Sahan Kumarasiri</span>
                <span style={{ color: "white" }}>
                  {" " + new Date().getFullYear() + " . "}
                </span>
              </div>
            </center>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditTodo;
