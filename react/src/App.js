import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todo from "./pages/Todo";
import Home from "./pages/Home";
import Acceuil from "./pages/Acceuil";
import { UserContext } from "./context/userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./components/Navigation";
import MyCalendar from "./pages/Calendar";
import Habits from "./pages/Habits";

function App() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Navigation />
      <Home />
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/calendar" element={<MyCalendar />} />
        <Route path="/habits" element={<Habits />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
