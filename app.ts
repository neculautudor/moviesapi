import express from "express";
import {
  addMovie,
  deleteMovie,
  getMovie,
  updateMovie,
} from "./src/controllers/common";
// import { createDatabase } from "./db/mymovies";
import dotenv from "dotenv";
import { connectToDb } from "./src/configs/db";
import ErrorHandler from "./src/middlewares/ErrorHandler";
dotenv.config();

//createDatabase()

export const pool = connectToDb();

const app: any = express();

app.use(express.json());

app.get("/status", (req, res) => {
  console.log(req.query.data);
  const status = {
    Status: "Running",
  };
  res.json(status);
});

app.post("/movies", addMovie);
app.delete("/movies/:id", deleteMovie);
app.get("/movies/:id", getMovie);
app.put("/movies/:id", updateMovie);
app.use(ErrorHandler);
app.listen(process.env.PORT, () => {
  console.log(`MovieAPI now listening to ${process.env.PORT}`);
});
