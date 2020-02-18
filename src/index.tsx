import React from "react";
import { render } from "react-dom";

import { CssBaseline } from "@material-ui/core";

import App from "./App";

import "./index.css";

render(
  <>
    <CssBaseline />
    <App />
  </>,
  document.getElementById("root")
);
