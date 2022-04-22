import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import DatePicker from "react-datepicker";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "../style/Calendar.css";
import { useEffect, useState } from "react";

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

const MyCalendar = () => {
  const events = JSON.parse(localStorage.getItem("events"));
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events || []);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(allEvents));
  }, [allEvents]);

  return (
    <div className="calendar">
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
        <label>
          Titre
          <input
            type="text"
            placeholder="Ajouter un titre"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
        </label>
        <label>
          Début :
          <div>
            <DatePicker
              placeholderText="Début"
              selected={newEvent.start}
              onChange={(start) => setNewEvent({ ...newEvent, start })}
            />
          </div>
        </label>
        <label>
          Fin :
          <div>
            <DatePicker
              placeholderText="Fin"
              selected={newEvent.end}
              onChange={(end) => setNewEvent({ ...newEvent, end })}
            />
          </div>
        </label>
        <button onClick={handleAddEvent}>Ajouter un évennement</button>
      </div>
    </div>
  );
};

export default MyCalendar;
