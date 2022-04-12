import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../style/Navigation.css";
import { UserContext } from "../context/userContext";
import { isEmpty } from "./utils";

function Navigation(props) {
  const { user, setUser } = useContext(UserContext);

  const exit = () => {
    setUser({});
  };

  return isEmpty(user) ? null : (
    <nav>
      <button onClick={exit}> Deconnexion</button>
      <h3>{user.email}</h3>
      <Link to="/planing">PLaning Hebdomadaire</Link>
      <Link to="/habits">Tracker d'habitude</Link>
      <Link to="/calendar">Calendrier</Link>
      <Link to="/todo">Todo Liste</Link>
      <Link to="/journal">Journal Perso</Link>
    </nav>
  );
}

export default Navigation;
