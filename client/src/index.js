import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import UserProvider from "./context/userContext";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/style/theme";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <UserProvider>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App tab="home" />
      </BrowserRouter>
    </ThemeProvider>
  </UserProvider>
);
