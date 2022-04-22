/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "../style/Habits.css";
import tab from "../tab.json";
import { UserContext } from "../context/userContext";
import axios from "axios";

function Habits() {
  const { user } = useContext(UserContext);

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

  //reset const
  const [resetId, setResetID] = useState([]);

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
      case "Neutre":
        setColor("box-neutre");
        //setBox("red");
        break;
      default:
        break;
    }
  };

  // Récuperer les habitudes de la base de donné
  useEffect(() => {
    const getHabits = async () => {
      try {
        const res = await axios.get("http://localhost:5500/habit");
        setListHabit(res.data.filter((el) => el.user_email === user));
        setResetID(listHabit.map((el) => el._id));
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
        user_email: user,
        className: tab,
      });
      setListHabit((prev) => [...prev, res.data]);
      setResetID((prev) => [...prev, res.data._id]);
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

  useEffect(() => {
    const updateHabit = async () => {
      if (box !== undefined) {
        if (
          Number(box.target.cellIndex) >= 2 &&
          Number(box.target.cellIndex) <= 22
        ) {
          try {
            setTabToUpdate(tabToUpdate.splice(indexToUpdate - 2, 1, color));
            axios.put(`http://localhost:5500/habit/${idToUpdate}`, {
              className: tabToUpdate,
            });
          } catch (error) {
            console.log(error);
          }
        }
      }
    };
    updateHabit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box]);

  //Réinitialisr le tableau
  const reset = () => {
    try {
      console.log(resetId);
      setTabToUpdate(tab);
      resetId.forEach((id) =>
        axios.put(`http://localhost:5500/habit/${id}`, {
          className: tab,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
            <td>
              <button className="reset-btn" onClick={reset}>
                Réinitialiser
              </button>
            </td>
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
              }}
            >
              <td>{el.habit}</td>
              <td>{el.condition}</td>
              {el.className.map((el, index) => (
                <th key={index} className={el}></th>
              ))}
              <td>
                <button
                  className="delete-btn"
                  onClick={() => {
                    deleteHabit(el._id);
                    setResetID(resetId.filter((id) => id !== el._id));
                  }}
                >
                  Supprimer
                </button>
              </td>
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
          <label htmlFor="Green">Le job est FAIT !</label>
        </div>
        <div className="radio-btn">
          <div className="blue"></div>
          <input type="radio" id="blue" name="drone" value="Blue" />
          <label htmlFor="Blue">
            Le job n'est pas fait mais ce n'est pas de ma faute.{" "}
          </label>
        </div>
        <div className="radio-btn">
          <div className="red"></div>
          <input type="radio" id="red" name="drone" value="Red" />
          <label htmlFor="Red">La Résistance m'a eu...</label>
        </div>
        <div className="radio-btn">
          <div className="neutre"></div>
          <input type="radio" id="red" name="drone" value="Neutre" />
          <label htmlFor="Neutre"> Effacer </label>
        </div>
      </div>
    </div>
  );
}

export default Habits;
