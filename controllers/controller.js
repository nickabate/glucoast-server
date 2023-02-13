const { v4: uuidv4 } = require("uuid");
const fs = require("node:fs");

// Convenience function to get all data stored
const getInfo = () => {
  const jsonData = fs.readFileSync("./data/userinfo1.json");
  return JSON.parse(jsonData);
};

// Get all dates info
exports.index = (_req, res) => {
  const userData = getInfo();
  res.status(200).json(userData);
};

// Get date by ID
exports.dateById = (req, res) => {
  const userData = getInfo();
  const dateById = userData.find((date) => date.id === req.params.id);

  if (!dateById) {
    return res
      .status(400)
      .json({ error: true, message: "No date ID provided." });
  }

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
    preglucose1: req.body.preglucose1,
    preglucose2: req.body.preglucose2,
    preglucose3: req.body.preglucose3,
    postglucose1: req.body.postglucose1,
    postglucose2: req.body.postglucose2,
    postglucose3: req.body.postglucose3,
    sleep: req.body.sleep,
    exercise: req.body.exercise,
  };
  userData.splice(editItem, 1, newItem);
  fs.writeFileSync("./data/userinfo1.json", JSON.stringify(userData), (err) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "There was an error editing the date, please try again.",
      });
    }
  });
  res.status(204).send("Item updated!");
};

// Post new date
exports.newDate = (req, res) => {
  const userData = getInfo();
  const newDate = {
    id: uuidv4(),
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
    preglucose1: req.body.preglucose1,
    preglucose2: req.body.preglucose2,
    preglucose3: req.body.preglucose3,
    postglucose1: req.body.postglucose1,
    postglucose2: req.body.postglucose2,
    postglucose3: req.body.postglucose3,
    sleep: req.body.sleep,
    exercise: req.body.exercise,
  };

  userData.push(newDate);
  fs.writeFileSync("./data/userinfo1.json", JSON.stringify(userData), (err) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "There was an error adding the date, please try again.",
      });
    }
  });
  res.status(201).send("New date added!");
};

// Delete date by ID
exports.deleteById = (req, res) => {
  const userData = getInfo();
  const deleteItem = userData.findIndex((item) => {
    return item.id === req.params.id;
  });
  userData.splice(deleteItem, 1);
  fs.writeFileSync("./data/userinfo1.json", JSON.stringify(userData), (err) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: "There was an error deleting the date, please try again.",
      });
    }
  });
  res.status(204).send("Deleted item!");
};
