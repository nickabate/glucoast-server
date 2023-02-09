const { v4: uuidv4 } = require("uuid");
const fs = require("node:fs");

// Convenience function
const getInfo = () => {
  const jsonData = fs.readFileSync("./data/userinfo1.json");
  return JSON.parse(jsonData);
};

// Get all JSON info
exports.index = (_req, res) => {
  const userData = getInfo();
  res.status(200).json(userData);
};

// Get date by ID
exports.dateById = (req, res) => {
  const userData = getInfo();
  const dateById = userData.find((date) => date.id === +req.params.id);
  res.status(200).json(dateById);
};

// Edit date by ID
exports.editById = (req, res) => {
  const userData = getInfo();
  const editItem = userData.findIndex((item) => {
    return item.id === req.body.id;
  });
  const newItem = {
    id: req.body.id,
    userid: req.body.userid,
    week: req.body.week,
    weekday: req.body.weekday,
    day: req.body.day,
    meal1: req.body.meal1,
    meal2: req.body.meal2,
    meal3: req.body.meal3,
    insulin1: req.body.insulin1,
    insulin2: req.body.insulin2,
    insulin3: req.body.insulin3,
    sleep: req.body.sleep,
    exercise: req.body.exercise,
  };
  userData.splice(editItem, 1, newItem);
  fs.writeFileSync("./data/userinfo1.json", JSON.stringify(userData));
  res.status(200).send("Item updated!");
};
