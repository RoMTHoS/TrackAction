import React, { useState } from "react";

function AddActivityForm(props) {
  const [time, setTime] = useState("self");
  const [day, setDay] = useState("monday");
  const [start, setStart] = useState("cinq");
  const [end, setEnd] = useState("cinq");

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Ajouter une activité :
        <input type="text" placeholder="Activité" />
      </label>
      <label>
        Type de temps :
        <select value={time} onChange={(e) => setTime(e.target.value)}>
          <option value="self">Temps pour soi</option>
          <option value="work">Temps de travail</option>
          <option value="obligate">Temps obligatoire</option>
          <option value="relax">Temps de détente</option>
        </select>
      </label>
      <label>
        Jour :
        <select value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="monday">Lundi</option>
          <option value="tuesday">Mardi</option>
          <option value="wednesday">Mercredi</option>
          <option value="thursday">Jeudi</option>
          <option value="friday">Vendredi</option>
          <option value="saturday">Samedi</option>
          <option value="sunday">Dimanche</option>
        </select>
      </label>
      <label>
        Début :
        <select value={start} onChange={(e) => setStart(e.target.value)}>
          <option value="cinq">05:00</option>
          <option value="six">06:00</option>
          <option value="sept">07:00</option>
          <option value="huit">08:00</option>
          <option value="neuf">09:00</option>
          <option value="dix">10:00</option>
          <option value="onze">11:00</option>
          <option value="douze">12:00</option>
          <option value="treize">13:00</option>
          <option value="quatorze">14:00</option>
          <option value="quinze">15:00</option>
          <option value="seize">16:00</option>
          <option value="dix-sept">17:00</option>
          <option value="dix-huit">18:00</option>
          <option value="dix-neuf">19:00</option>
          <option value="vingt">20:00</option>
          <option value="vingt-un">21:00</option>
          <option value="vingt-deux">22:00</option>
          <option value="vingt-trois">23:00</option>
          <option value="vingt-quatre">24:00</option>
        </select>
      </label>
      <label>
        Fin :
        <select value={end} onChange={(e) => setEnd(e.target.value)}>
          <option value="cinq">05:00</option>
          <option value="six">06:00</option>
          <option value="sept">07:00</option>
          <option value="huit">08:00</option>
          <option value="neuf">09:00</option>
          <option value="dix">10:00</option>
          <option value="onze">11:00</option>
          <option value="douze">12:00</option>
          <option value="treize">13:00</option>
          <option value="quatorze">14:00</option>
          <option value="quinze">15:00</option>
          <option value="seize">16:00</option>
          <option value="dix-sept">17:00</option>
          <option value="dix-huit">18:00</option>
          <option value="dix-neuf">19:00</option>
          <option value="vingt">20:00</option>
          <option value="vingt-un">21:00</option>
          <option value="vingt-deux">22:00</option>
          <option value="vingt-trois">23:00</option>
          <option value="vingt-quatre">24:00</option>
        </select>
      </label>
      <input type="submit" value="Ajouter" />
    </form>
  );
}

export default AddActivityForm;
