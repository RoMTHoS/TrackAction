/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import "../style/Todo.css";
import axios from "axios";
import { UserContext } from "../context/userContext";

function Todo() {
  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");

  const { user } = useContext(UserContext);

  // add new todo item to database
  const addItem = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const res = await axios.post(
        "https://trackaction.herokuapp.com/api/item",
        {
          item: itemText,
          user_email: user,
        }
      );
      setListItems((prev) => [...prev, res.data]);
      setItemText("");
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch all todo items from database
  useEffect(() => {
    const getItemList = async () => {
      try {
        const res = await axios.get(
          "https://trackaction.herokuapp.com/api/items"
        );
        setListItems(res.data.filter((el) => el.user_email === user));
      } catch (error) {
        console.log(error);
      }
    };
    getItemList();
  }, [user]);

  // Delete item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`https://trackaction.herokuapp.com/api/item/${id}`);
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
    } catch (error) {
      console.log(error);
    }
  };

  //Creation of input field when you want update
  const renderUpdateForm = () => (
    <form
      className="update-todo-form"
      onSubmit={(e) => {
        updateItem(e);
      }}
    >
      <input
        className="update-todo-input"
        type="text"
        placeholder="New Item"
        onChange={(e) => {
          setUpdateItemText(e.target.value);
        }}
        value={updateItemText}
      />
      <button className="update-todo-new-btn" type="submit">
        Update
      </button>
    </form>
  );

  //Update item
  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5500/api/item/${isUpdating}`,
        { item: updateItemText }
      );
      console.log(res.data);
      const updatedItemIndex = listItems.findIndex(
        (item) => item._id === isUpdating
      );
      const updatedItem = (listItems[updatedItemIndex].item = updateItemText);
      setUpdateItemText("");
      setIsUpdating("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="todo">
      <h1>Todo List</h1>
      <form className="todo-form" onSubmit={(e) => addItem(e)}>
        <input
          type="text"
          placeholder="Add Todo Item"
          onChange={(e) => {
            setItemText(e.target.value);
          }}
          value={itemText}
        />
        <button type="submit">Add</button>
      </form>
      <div className="todolist-items">
        {listItems.map((item) => (
          <div key={item._id} className="todo-item">
            {isUpdating === item._id ? (
              renderUpdateForm()
            ) : (
              <>
                <p className="item-content">{item.item}</p>
                <button
                  className="update-todo-button"
                  onClick={() => {
                    setUpdateItemText(item.item);
                    setIsUpdating(item._id);
                  }}
                >
                  Update
                </button>
                <button
                  className="delete-todo-button"
                  onClick={() => {
                    deleteItem(item._id);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
