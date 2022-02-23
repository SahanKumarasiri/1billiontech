const router = require("express").Router();
const Todos = require("../models/todos");

router.route("/create").post(async (req, res) => { //route for creating database insertion
  const { todo, email, plannedDate, dateCreated, dateModified, checkingDate } = req.body;
  const resolved = Boolean(req.body.resolved);

  const newTodo = new Todos({
    todo,
    plannedDate,
    dateCreated,
    dateModified,
    email,
    resolved,
    checkingDate,
  }); // create a new object using database schema

  const isAvailable = await Todos.findOne({ //check the availability of saving data
    todo: { $regex: new RegExp(todo, "i") },
    checkingDate: checkingDate,
    email:email
  });

  if (isAvailable) { // if satisfied return proper error
    return res
      .status(401)
      .json({ error: "Already Planned ! Plz plan something new 😀" });
  }

  await newTodo
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => res.status(500).json({ success: false, error: error })); // else save to the db
});

router.route("/").get(async (req, res) => { //route for fetching al the data
  await Todos.find()
    .then((todos) => res.json(todos))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

router.route("/get/:id").get(async (req, res) => { //route for getting a relavant document using id
  const { id } = req.params;

  await Todos.findById(id) //find by the document by id 
    .then((todo) => res.json(todo))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

router.route("/delete/:id").delete(async (req, res) => { //route for deleting a relavant document using id
  const { id } = req.params;

  await Todos.findByIdAndDelete(id) //find by the document by id and delete
    .then(() => res.json({ message: "Successfully Deleted" }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

router.route("/update/:id").put(async (req, res) => { //route for updating a relavant document using id
  //backend route for updating relavant data and passing back
  const { id } = req.params;
  const { todo, plannedDate ,dateModified } = req.body;

  await Todos.findByIdAndUpdate(id, { todo, plannedDate, dateModified }) //find the document by and update the relavant data
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, Error: error }));
});

router.route("/resolve/:id").put(async (req, res) => { //custom update route
  const { id } = req.params;
  const resolved = Boolean(req.body.resolved);
  const { dateModified } = req.body;

  await Todos.findByIdAndUpdate(id, { resolved, dateModified })
    .then(() => res.json({ message: "Successfully Updated" }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

module.exports = router;
