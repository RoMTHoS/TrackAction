import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Navigation.css";
import { UserContext } from "../context/userContext";
import { Button } from "@mui/material";

function Navigation() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const exit = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const connect = () => {
    navigate("/");
  };

  return (
    <nav className="navigation">
      {user === null ? (
        <Button onClick={connect} variant="outlined">
          Connexion
        </Button>
      ) : (
        <Button onClick={exit} variant="outlined" color="primary">
          Deconnexion
        </Button>
      )}

      <h3>{user}</h3>
      <Link to="/habits">Tracker d'habitude</Link>
      <Link to="/todo">Todo Liste</Link>
      <Link to="/notes">Notes</Link>
      <Link to="/calendar">Calendrier</Link>
    </nav>
  );
}

export default Navigation;
