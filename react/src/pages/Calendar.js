import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import DatePicker from "react-datepicker";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "../components/utils";
import { UserContext } from "../context/userContext";
import "../style/Calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [];

const MyCalendar = () => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  return isEmpty(user) ? (
    navigate("/login")
  ) : (
    <div>
      <h1> Calendrier </h1>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
      <h2> Ajouter un évènement </h2>
      <div className="event-form">
        <input
          type="text"
          placeholder="Ajouter un titre"
          //style={{ width: "20%", marginRigth: "10px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <div>
          <DatePicker
            placeholderText="Début"
            //style={{ marginRight: "10px" }}
            selected={newEvent.start}
            onChange={(start) => setNewEvent({ ...newEvent, start })}
          />
        </div>
        <div>
          <DatePicker
            placeholderText="Fin"
            //style={{ marginRight: "10px" }}
            selected={newEvent.end}
            onChange={(end) => setNewEvent({ ...newEvent, end })}
          />
        </div>
        <button onClick={handleAddEvent}>Ajouter un évennement</button>
      </div>
    </div>
  );
};

export default MyCalendar;
