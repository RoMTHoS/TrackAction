import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Home.css";
import { UserContext } from "../context/userContext";
import { isEmpty } from "../components/utils";

function Home(props) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const login = () => {
    navigate("/login");
  };

  const register = () => {
    navigate("/register");
  };
  return isEmpty(user) ? (
    <>
      <main className="home">
        <h1>TRACK ACTION</h1>
        <h2>Suit et visualise ta PROGRESSSION pour assurer ton EVOLUTION.</h2>
        <Link to="/"> Accueil </Link>
        <div className="button">
          <button onClick={login}> Se connecter </button>

          <button onClick={register}> S'inscrire </button>
        </div>
      </main>
    </>
  ) : null;
}

export default Home;
