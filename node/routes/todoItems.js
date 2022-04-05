const router = require("express").Router();

//import todo model
const todoItemsModel = require("../models/todoItems");

//Route to add todo item in database
router.post("/api/item", async (req, res) => {
  try {
    const newItem = new todoItemsModel({
      item: req.body.item,
    });
    // save this item in db
    const saveItem = await newItem.save();
    res.status(200).json(saveItem);
  } catch (error) {
    res.json(error);
  }
});

//Route to get data from database
router.get("/api/items", async (req, res) => {
  try {
    const allTodoItems = await todoItemsModel.find({});
    res.status(200).json(allTodoItems);
  } catch (error) {
    res.json(error);
  }
});

//Update item
router.put("/api/item/:id", async (req, res) => {
  try {
    //find item by its id and update it
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Item Updated");
  } catch (error) {
    res.json(error);
  }
});

//Delete item
router.delete("/api/item/:id", async (req, res) => {
  try {
    //find item by its id and delete it
    const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Item Deleted");
  } catch (error) {
    res.json(error);
  }
});

//export router
module.exports = router;
