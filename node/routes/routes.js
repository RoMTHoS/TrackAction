const router = require("express").Router();

//import auth model
const authController = require("../controller/authController");
//import todo model
const todoItemsModel = require("../models/todoItems");

const habitModel = require("../models/habit");

// Authentification Routes
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/users", authController.getUsers);

//Route to add todo item in database
router.post("/api/item", async (req, res) => {
  try {
    const newItem = new todoItemsModel({
      item: req.body.item,
      user_email: req.body.user_email,
      //id: req.params.user_id,
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

//Habit routes
//Ajouter des habitudes
router.post("/habit", async (req, res) => {
  try {
    const newHabit = new habitModel({
      habit: req.body.habit,
      condition: req.body.condition,
      user_email: req.body.user_email,
      className: req.body.className,
    });
    const saveHabit = await newHabit.save();
    res.status(200).json(saveHabit);
  } catch (error) {
    res.json(error);
  }
});
//Récupérer les habitudes
router.get("/habit", async (req, res) => {
  try {
    const allHabits = await habitModel.find({});
    res.status(200).json(allHabits);
  } catch (error) {
    res.json(error);
  }
});
//Modifier les jours des habitudes
router.put("/habit/:id", async (req, res) => {
  try {
    //find item by its id and update it
    const updateHabit = await habitModel.findByIdAndUpdate(req.params.id, {
      $set: {
        className: req.body.className,
      },
    });
    res.status(200).json("Habit Updated");
  } catch (error) {
    res.json(error);
  }
});
//Supprimer une habitude
router.delete("/habit/:id", async (req, res) => {
  try {
    //find item by its id and delete it
    await habitModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Item Deleted");
  } catch (error) {
    res.json(error);
  }
});

//export router
module.exports = router;
