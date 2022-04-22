import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
        <Link to="/"> Accueil </Link>
        <div className="button">
          <button onClick={login}> Se connecter </button>
          <button onClick={register}> S'inscrire </button>
        </div>
      </main>
    </>
  );
}

export default Home;
