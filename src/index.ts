import express from "express";
import cors from 'cors';
import routes from "./routes/routes.js";
import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';

config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.send("Welcome to the GLUCOAST API");
});

app.use("/api", routes);

app.listen(port, () => {
  console.log("Server running on port:", port);
});
