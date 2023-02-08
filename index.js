const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 8080;
const userData = require("./routes/data");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api", userData);

app.listen(port, () => {
  console.log("Server running on port:", port);
});
