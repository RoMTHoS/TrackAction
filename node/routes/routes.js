const router = require("express").Router();

//import models
const authController = require("../controller/authController");
const todoItemsModel = require("../models/todoItems");
const habitModel = require("../models/habit");
const dayModel = require("../models/day");
const colorModel = require("../models/color");
const color = require("../models/color");

// Authentification Routes
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/users", authController.getUsers);

router.get("/me", authController.authentificateToken, async (req, res) => {
  res.send(req.user);
});

router.post("/refreshToken", authController.refreshToken, async (req, res) => {
  res.send(req);
});

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

//Planning routes
//Récupérer un jour
router.get("/planning", async (req, res) => {
  try {
    const AllWeek = await dayModel.find({});
    res.status(200).json(AllWeek);
  } catch (error) {
    res.json(error);
  }
});
//Créer un nouveau jour
router.post("/planning", async (req, res) => {
  try {
    const newDay = new dayModel({
      day: req.body.day,
      user_email: req.body.user_email,
      content: [],
    });
    const saveDay = await newDay.save();
    res.status(200).json(saveDay);
  } catch (error) {
    res.json(error);
  }
});

//Modifier le programme du jour
router.put("/planning/:id", async (req, res) => {
  try {
    //find day by its id and update it
    const updateDay = await dayModel.findByIdAndUpdate(req.params.id, {
      $set: {
        content: req.body.content,
      },
    });
    res.status(200).json("Day Updated");
  } catch (error) {
    res.json(error);
  }
});

// Color Routes
router.post("/color", async (req, res) => {
  try {
    const newColor = new colorModel({
      user_email: req.body.user_email,
      self: req.body.self,
      work: req.body.work,
      obligate: req.body.obligate,
      relax: req.body.relax,
    });
    const saveColor = await newColor.save();
    res.status(200).json(saveColor);
  } catch (error) {
    res.json(error);
  }
});

router.put("/color/:id", async (req, res) => {
  try {
    const updateColor = await colorModel.findByIdAndUpdate(req.params.id, {
      $set: {
        self: req.body.self,
        work: req.body.work,
        obligate: req.body.obligate,
        relax: req.body.relax,
      },
    });
    res.status(200).json("Palette Updated");
  } catch (error) {
    res.json(error);
  }
});

router.get("/color", async (req, res) => {
  try {
    const colors = await colorModel.find({});
    res.status(200).json(colors);
  } catch (error) {
    res.json(error);
  }
});

//export router
module.exports = router;
