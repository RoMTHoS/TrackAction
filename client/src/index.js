import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import UserProvider from "./context/userContext";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <UserProvider>
    <BrowserRouter>
      <App tab="home" />
    </BrowserRouter>
  </UserProvider>
);
