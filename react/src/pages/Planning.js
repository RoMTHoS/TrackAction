import React, { useContext, useEffect, useState } from "react";
import Colors from "../components/Colors";
import "../style/Planning.css";
import { UserContext } from "../context/userContext";
import axios from "axios";
import AddActivityForm from "../components/AddActivityForm";

function Planning() {
  const { user } = useContext(UserContext);

  console.log(user);

  const [textToUpdate, setTextToUpdate] = useState("");

  //Constante pour les couleurs des temps
  const [colors, setColors] = useState("");
  const [selfTime, setSelfTime] = useState("");
  const [workTime, setWorkTime] = useState("");
  const [obligateTime, setObligateTime] = useState("");
  const [relaxationTime, setRelaxationTime] = useState("");

  useEffect(() => {
    const getColors = async () => {
      try {
        const res = await axios.get("http://localhost:5500/color");
        setColors(res.data.filter((el) => el.user_email === user));
        console.log(colors);
      } catch (error) {
        console.log(error);
      }
    };
    getColors();
  }, []);

  console.log(colors);

  useEffect(() => {
    if (colors !== "") {
      setSelfTime(colors[0].self);
      setWorkTime(colors[0].work);
      setObligateTime(colors[0].obligate);
      setRelaxationTime(colors[0].relax);
    }
  }, [colors]);

  useEffect(() => {
    console.log(selfTime);
  }, [selfTime]);

  useEffect(() => {
    console.log(workTime);
  }, [workTime]);

  useEffect(() => {
    console.log(obligateTime);
  }, [obligateTime]);

  useEffect(() => {
    console.log(relaxationTime);
  }, [relaxationTime]);

  return (
    <div className="planning-page">
      <h1> Planning Hebdomadaire </h1>
      <div className="type-time">
        <div
          className="time"
          onClick={(e) => {
            if (e.target.style.background !== "")
              setSelfTime(e.target.style.background);
          }}
        >
          <Colors color={selfTime} />
          <h3>Temps pour soi</h3>
        </div>
        <div
          className="time"
          onClick={(e) => {
            if (e.target.style.background !== "")
              setWorkTime(e.target.style.background);
          }}
        >
          <Colors color={workTime} />
          <h3>Temps pour de travail</h3>
        </div>
        <div
          className="time"
          onClick={(e) => {
            if (e.target.style.background !== "")
              setObligateTime(e.target.style.background);
          }}
        >
          <Colors color={obligateTime} />
          <h3>Temps pour obligatoire</h3>
        </div>
        <div
          className="time"
          onClick={(e) => {
            if (e.target.style.background !== "")
              setRelaxationTime(e.target.style.background);
          }}
        >
          <Colors color={relaxationTime} />
          <h3>Temps de détente</h3>
        </div>
      </div>
      <div className="planning">
        <div className="lundi">LUNDI</div>
        <div className="mardi">MARDI</div>
        <div className="mercredi">MERCREDI</div>
        <div className="jeudi">JEUDI</div>
        <div className="vendredi">VENDREDI</div>
        <div className="samedi">SAMEDI</div>
        <div className="dimanche">DIMANCHE</div>
        <div className="cinq">05:00</div>
        <div className="six">06:00</div>
        <div className="sept">07:00</div>
        <div className="huit">08:00</div>
        <div className="neuf">09:00</div>
        <div className="dix">10:00</div>
        <div className="onze">11:00</div>
        <div className="douze">12:00</div>
        <div className="treize">13:00</div>
        <div className="quatorze">14:00</div>
        <div className="quinze">15:00</div>
        <div className="seize">16:00</div>
        <div className="dix-sept">17:00</div>
        <div className="dix-huit">18:00</div>
        <div className="dix-neuf">19:00</div>
        <div className="vingt">20:00</div>
        <div className="vingt-un">21:00</div>
        <div className="vingt-deux">22:00</div>
        <div className="vingt-trois">23:00</div>
        <div className="vingt-quatre">24:00</div>
        <div
          className="lundi1"
          onClick={(e) => {
            console.log(e.target.className);
            setTextToUpdate(e.target.className);
          }}
        >
          Lundi1
        </div>
        <div className="lundi2"></div>
        <div className="lundi3"></div>
        <div className="lundi4"></div>
        <div className="lundi5"></div>
        <div className="lundi6"></div>
        <div className="lundi7"></div>
        <div className="lundi8"></div>
        <div className="lundi9"></div>
        <div className="lundi10"></div>
        <div className="lundi11"></div>
        <div className="lundi12"></div>
        <div className="lundi13"></div>
        <div className="lundi14"></div>
        <div className="lundi15"></div>
        <div className="lundi16"></div>
        <div className="lundi17"></div>
        <div className="lundi18"></div>
        <div className="lundi19"></div>
        <div className="lundi20"></div>
      </div>
      <AddActivityForm />
    </div>
  );
}

export default Planning;
