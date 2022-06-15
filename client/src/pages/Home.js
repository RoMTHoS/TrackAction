import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "../style/Home.css";

function Home() {
  const navigate = useNavigate();

  const login = () => {
    navigate("/login");
  };

  const register = () => {
    navigate("/register");
  };
  return (
    <>
      <main className="home">
        <h1>TRACK ACTION</h1>
        <div className="button">
          <Button onClick={login} variant="outlined">
            Se connecter
          </Button>
          <Button onClick={register} variant="outlined">
            S'inscrire
          </Button>
        </div>
      </main>
    </>
  );
}

export default Home;
