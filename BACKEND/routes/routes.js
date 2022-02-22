const router = require("express").Router();
const Todos = require("../models/todos");

router.route("/create").post(async (req, res) => {
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
  });

  const isAvailable = await Todos.findOne({
    todo: { $regex: new RegExp(todo, "i") },
    checkingDate: checkingDate,
    email:email
  });

  if (isAvailable) {
    return res
      .status(401)
      .json({ error: "Already Planned ! Plz plan something new 😀" });
  }

  await newTodo
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

router.route("/").get(async (req, res) => {
  await Todos.find()
    .then((todos) => res.json(todos))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

router.route("/get/:id").get(async (req, res) => {
  const { id } = req.params;

  await Todos.findById(id)
    .then((todo) => res.json(todo))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

router.route("/delete/:id").delete(async (req, res) => {
  const { id } = req.params;

  await Todos.findByIdAndDelete(id)
    .then(() => res.json({ message: "Successfully Deleted" }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

router.route("/update/:id").put(async (req, res) => {
  //backend route for updating relavant data and passing back
  const { id } = req.params;
  const { todo, plannedDate ,dateModified } = req.body;

  await Todos.findByIdAndUpdate(id, { todo, plannedDate, dateModified }) //find the document by and update the relavant data
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, Error: error }));
});

router.route("/resolve/:id").put(async (req, res) => {
  const { id } = req.params;
  const resolved = Boolean(req.body.resolved);
  const { dateModified } = req.body;

  await Todos.findByIdAndUpdate(id, { resolved, dateModified })
    .then(() => res.json({ message: "Successfully Updated" }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

module.exports = router;
