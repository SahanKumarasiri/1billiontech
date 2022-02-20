import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import React, { useState } from "react";

import "./Button.css";

const CreateTodo = () => {
  const [value, setValue] = useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
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
            <span className="wave-emoji">👋</span> Create Your Todo 😍
          </h1>
        </div>
      </header>
      <main>
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
                  <i className="fa fa-plus" aria-hidden="true"></i> Plan Your
                  Future
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
                            inputFormat="MM/dd/yyyy"
                            inputProps={{
                              sx: {
                                // set the color of the label when not shrinked
                                color: "white",
                              },
                            }}
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </div>
                      </Stack>
                    </LocalizationProvider>
                  </div>
                </div>
                <a href="#" class="animated-button1">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <i className="fa fa-cogs" aria-hidden="true"></i> Create
                </a>
              </center>
            </div>
          </div>
          <center>
            <span style={{ color: "white" }}>{"Copyright © "}</span>
            <span style={{ color: "red" }}>Sahan Kumarasiri</span>
            <span style={{ color: "white" }}>
              {" " + new Date().getFullYear() + " . "}
            </span>
          </center>
        </div>
      </main>
    </div>
  );
};

export default CreateTodo;
