import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Navigation.css";
import { UserContext } from "../context/userContext";
import Acceuil from "../pages/Acceuil";

function Navigation() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const exit = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav>
      <button onClick={exit}> Deconnexion</button>
      <h3>{user}</h3>
      <Link to="/planning">Planing Hebdomadaire</Link>
      <Link to="/habits">Tracker d'habitude</Link>
      <Link to="/todo">Todo Liste</Link>
      <Link to="/notes">Notes</Link>
      <Link to="/calendar">Calendrier</Link>
    </nav>
  );
}

export default Navigation;
