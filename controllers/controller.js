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
      .json({ error: true, message: "No valid date ID provided." });
  }

  res.status(200).json(dateById);
};

// Edit date by ID
exports.editById = (req, res) => {
  const userData = getInfo();
  const editItem = userData.findIndex((item) => {
    return item.id === req.body.id;
  });

  if (!editItem) {
    return res
      .status(400)
      .json({ error: true, message: "No valid date ID provided." });
  }

  const {
    id,
    userid,
    week,
    weekday,
    day,
    meal1,
    meal2,
    meal3,
    insulin1,
    insulin2,
    insulin3,
    preglucose1,
    preglucose2,
    preglucose3,
    postglucose1,
    postglucose2,
    postglucose3,
    sleep,
    exercise,
  } = req.body;

  const newItem = {
    id,
    userid,
    week,
    weekday,
    day,
    meal1,
    meal2,
    meal3,
    insulin1,
    insulin2,
    insulin3,
    preglucose1,
    preglucose2,
    preglucose3,
    postglucose1,
    postglucose2,
    postglucose3,
    sleep,
    exercise,
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
  res.status(200).send("Item updated!");
};

// Post new date
exports.newDate = (req, res) => {
  const userData = getInfo();

  const {
    userid,
    week,
    weekday,
    day,
    meal1,
    meal2,
    meal3,
    insulin1,
    insulin2,
    insulin3,
    preglucose1,
    preglucose2,
    preglucose3,
    postglucose1,
    postglucose2,
    postglucose3,
    sleep,
    exercise,
  } = req.body;

  const newDate = {
    id: uuidv4(),
    userid,
    week,
    weekday,
    day,
    meal1,
    meal2,
    meal3,
    insulin1,
    insulin2,
    insulin3,
    preglucose1,
    preglucose2,
    preglucose3,
    postglucose1,
    postglucose2,
    postglucose3,
    sleep,
    exercise,
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
  res.status(200).send("Deleted item!");
};
