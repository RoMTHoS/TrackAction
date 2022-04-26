import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todo from "./pages/Todo";
import Acceuil from "./pages/Acceuil";
import { UserContext } from "./context/userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./components/Navigation";
import MyCalendar from "./pages/Calendar";
import Habits from "./pages/Habits";
import Notes from "./pages/Notes";

function App() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/calendar" element={<MyCalendar />} />
        <Route path="/habits" element={<Habits />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
