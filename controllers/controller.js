const { v4: uuidv4 } = require("uuid");
const fs = require("node:fs");

// Convenience function
const getInfo = () => {
  const jsonData = fs.readFileSync("./data/userinfo.json");
  return JSON.parse(jsonData);
};

// Get all JSON info
exports.index = (_req, res) => {
  const userData = getInfo();
  res.status(200).json(userData);
};
