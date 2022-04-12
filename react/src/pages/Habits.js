import React, { useContext, useEffect, useState } from "react";
import "../style/Habits.css";
import tab from "../tab.json";
import classTableau from "../classTableau.json";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "../components/utils";
import axios from "axios";

function Habits() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [listHabit, setListHabit] = useState([]);
  const [habitText, setHabitText] = useState("");
  const [conditionText, setConditionText] = useState("");

  //const [habits, setHabits] = useState(data);
  const [box, setBox] = useState();
  const [color, setColor] = useState("");

  //update const
  const [indexToUpdate, setIndexToUpdate] = useState("");
  const [idToUpdate, setIdToUpdate] = useState("");
  const [tabToUpdate, setTabToUpdate] = useState([]);

  //Modifier la couleur des jours du tableau
  const handleColorSelector = (color) => {
    switch (color) {
      case "Green":
        setColor("box-green");
        //setBox("green");
        break;
      case "Blue":
        setColor("box-blue");
        //setBox("blue");
        break;
      case "Red":
        setColor("box-red");
        //setBox("red");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (box !== undefined) {
      box.target.className = color;
    }
  }, [box]);

  // Récuperer les habitudes de la base de donné
  useEffect(() => {
    const getHabits = async () => {
      try {
        const res = await axios.get("http://localhost:5500/habit");
        setListHabit(res.data.filter((el) => el.user_email === user.email));
        //console.log(listHabit);
      } catch (error) {
        console.log(error);
      }
    };
    getHabits();
  }, []);

  // Ajouter une nouvelle habitude
  const addHabit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/habit", {
        habit: habitText,
        condition: conditionText,
        user_email: user.email,
        className: tab,
      });
      setListHabit((prev) => [...prev, res.data]);
      setHabitText("");
      setConditionText("");
    } catch (error) {
      console.log(error);
    }
  };

  //Supprimer une habitude
  const deleteHabit = async (id) => {
    try {
      await axios.delete(`http://localhost:5500/habit/${id}`);
      const newListHabit = listHabit.filter((item) => item._id !== id);
      setListHabit(newListHabit);
    } catch (error) {
      console.log(error);
    }
  };

  const updateHabit = async () => {
    try {
      setTabToUpdate(tabToUpdate.splice(indexToUpdate - 2, 1, color));
      const res = axios.put(`http://localhost:5500/habit/${idToUpdate}`, {
        className: tabToUpdate,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return isEmpty(user) ? (
    navigate("/login")
  ) : (
    <div className="habits-tracker">
      <h1> Tracker d'Habitudes </h1>
      <table>
        <thead>
          <tr>
            <th> Habitudes </th>
            <th> Conditions </th>
            <th className="day"> 1 </th>
            <th className="day"> 2 </th>
            <th className="day"> 3 </th>
            <th className="day"> 4 </th>
            <th className="day"> 5 </th>
            <th className="day"> 6 </th>
            <th className="day"> 7 </th>
            <th className="day"> 8 </th>
            <th className="day"> 9 </th>
            <th className="day"> 10 </th>
            <th className="day"> 11 </th>
            <th className="day"> 12 </th>
            <th className="day"> 13 </th>
            <th className="day"> 14 </th>
            <th className="day"> 15 </th>
            <th className="day"> 16 </th>
            <th className="day"> 17 </th>
            <th className="day"> 18 </th>
            <th className="day"> 19 </th>
            <th className="day"> 20 </th>
            <th className="day"> 21 </th>
          </tr>
        </thead>
        <tbody
          onClick={(e) => {
            setBox(e);
            setIndexToUpdate(e.target.cellIndex);
          }}
        >
          {listHabit.map((el) => (
            <tr
              key={el._id}
              onClick={() => {
                setIdToUpdate(el._id);
                setTabToUpdate(el.className);
                //console.log(el.currentTarget.parentElement.child.key);
                //console.log(el.currentTarget.cells);
                //console.log(el.currentTarget.__reactFiber$947zaxh1t3q.key);
                //setIdToUpdate(el.currentTarget.__reactFiber$947zaxh1t3q.key);
              }}
            >
              {/*console.log(el.className)*/}
              {/*console.log(el._id)*/}
              <td>{el.habit}</td>
              <td>{el.condition}</td>
              {el.className.map((el) => (
                <th onClick={updateHabit} className={el}></th>
              ))}

              {/*
              
              <th className={el.className[0]}></th>
              <th className={el.className[1]}></th>
              <th className={el.className[2]}></th>
              <th className={el.className[3]}></th>
              <th className={el.className[4]}></th>
              <th className={el.className[5]}></th>
              <th className={el.className[6]}></th>
              <th className={el.className[7]}></th>
              <th className={el.className[8]}></th>
              <th className={el.className[9]}></th>
              <th className={el.className[10]}></th>
              <th className={el.className[11]}></th>
              <th className={el.className[12]}></th>
              <th className={el.className[13]}></th>
              <th className={el.className[14]}></th>
              <th className={el.className[15]}></th>
              <th className={el.className[16]}></th>
              <th className={el.className[17]}></th>
              <th className={el.className[18]}></th>
              <th className={el.className[19]}></th>
              <th className={el.className[20]}></th>
              */}
              <button
                className="delete-todo-button"
                onClick={() => {
                  deleteHabit(el._id);
                }}
              >
                Supprimer
              </button>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-habit">
        <h2> Ajouter une habitude </h2>
        <form onSubmit={(e) => addHabit(e)}>
          <input
            type="text"
            name="habit"
            required="required"
            placeholder="Ajouter une habitude"
            onChange={(e) => setHabitText(e.target.value)}
            value={habitText}
          />
          <input
            type="text"
            name="habit"
            required="required"
            placeholder="Ajouter une condition"
            onChange={(e) => setConditionText(e.target.value)}
            value={conditionText}
          />
          <button type="submit"> Ajouter </button>
        </form>
      </div>
      <h2> Selection des couleurs </h2>
      <div
        className="color-select"
        onClick={(e) => handleColorSelector(e.target.value)}
      >
        <div className="radio-btn">
          <div className="green"></div>
          <input type="radio" id="green" name="drone" value="Green" />
          <label for="Green">Le job est FAIT !</label>
        </div>
        <div className="radio-btn">
          <div className="blue"></div>
          <input type="radio" id="blue" name="drone" value="Blue" />
          <label for="Blue">
            Le job n'est pas fait mais ce n'est pas de ma faute.{" "}
          </label>
        </div>
        <div className="radio-btn">
          <div className="red"></div>
          <input type="radio" id="red" name="drone" value="Red" />
          <label for="Red">La Résistance m'a eu...</label>
        </div>
        <div className="radio-btn">
          <div className="neutre"></div>
          <input type="radio" id="red" name="drone" value="Neutre" />
          <label for="Neutre"> Effacer </label>
        </div>
      </div>
    </div>
  );
}

export default Habits;
