import React from "react";
import "./Login.scss";

const Copyright = () => {
    return (
      <div className="buttons">
        <a className="blob-btn" href="/">
          <span className=""><i className="fa fa-home" aria-hidden="true"></i> Home</span>
          <span className="blob-btn__inner">
            <span className="blob-btn__blobs">
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
            </span>
          </span>
        </a>
        <br />
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                result="blur"
                stdDeviation="10"
              ></feGaussianBlur>
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                result="goo"
              ></feColorMatrix>
              <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
            </filter>
          </defs>
        </svg>
        {"Copyright © "}
        <span style={{ color: "red" }}>Sahan Kumarasiri</span>{" "}
        {new Date().getFullYear()}
        {"."}
      </div>
    );
  }

export default Copyright;