import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.get("/products ", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3001, () => {
  connectDB();
  console.log("Server started on http://localhost/3001");
});
