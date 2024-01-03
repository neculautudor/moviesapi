import express from "express";
// import { createDatabase } from "./db/mymovies";
import dotenv from "dotenv";
import { connectToDb } from "./src/configs/db";
import ErrorHandler from "./src/middlewares/ErrorHandler";
import { postMovieRoute } from "./src/routes/postMovieRoute";
import { deleteMovieRoute } from "./src/routes/deleteMovieRoute";
import { getMovieRoute } from "./src/routes/getMovieRoute";
import { updateMovieRoute } from "./src/routes/updateMovieRoute";
dotenv.config();

//createDatabase()

export const pool = connectToDb();

const app: any = express();

//middlewares
app.use(express.json());

//routes
app.post("/movies", postMovieRoute);
app.delete("/movies/:id", deleteMovieRoute);
app.get("/movies/:id", getMovieRoute);
app.put("/movies/:id", updateMovieRoute);

//errorHandler
app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`MovieAPI now listening to ${process.env.PORT}`);
});
