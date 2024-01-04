import express from "express";
// import { createDatabase } from "./db/mymovies";
import dotenv from "dotenv";
import { connectToDb } from "./src/configs/db";
import ErrorHandler from "./src/middlewares/ErrorHandler";
import { postMovieRoute } from "./src/routes/postMovieRoute";
import { deleteMovieRoute } from "./src/routes/deleteMovieRoute";
import { getMovieRoute } from "./src/routes/getMovieRoute";
import { updateMovieRoute } from "./src/routes/updateMovieRoute";
import { createAccountRoute } from "./src/routes/users/createAccountRoute";
import { authenticationRoute } from "./src/routes/users/authenticationRoute";
import { checkJWT } from "./src/middlewares/checkJWT";
dotenv.config();
//createDatabase()

export const pool = connectToDb();

const app: any = express();

//middlewares
app.use(express.json());

//movieRoutes
app.post("/movies", checkJWT, postMovieRoute);
app.delete("/movies/:id", checkJWT, deleteMovieRoute);
app.get("/movies/:id", checkJWT, getMovieRoute);
app.put("/movies/:id", checkJWT, updateMovieRoute);

//userRoutes
app.post("/signup", createAccountRoute);
app.post("/login", authenticationRoute);
//errorHandler
app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`MovieAPI now listening to ${process.env.PORT}`);
});
