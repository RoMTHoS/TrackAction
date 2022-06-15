import plusIcon from "../assets/plus.jpg";

import "../style/Sidebar.css";

function Sidebar(props) {
  //const colors = ["#2B2B2B", "#fec971", " #00d4fe", "#b693fd", "#e4ee91"];
  const color = "#2B2B2B";

  //const [listOpen, setListOpen] = useState(false);

  return (
    <div className="sidebar">
      <img src={plusIcon} alt="Add" onClick={() => props.addNote(color)} />
      {/*}
      <ul className={`sidebar_list ${listOpen ? "sidebar_list_active" : ""}`}>
        {colors.map((item, index) => (
          <li
            key={index}
            className="sidebar_list_item"
            style={{ backgroundColor: item }}
            onClick={() => props.addNote(item)}
          />
        ))}
      </ul>
        {*/}
    </div>
  );
}

export default Sidebar;
