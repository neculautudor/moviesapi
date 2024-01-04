import { CustomError } from "../../errors/errorTypes";
import { addUserMovieQuery } from "../../queries/userQueries/postQueries";

export const addToFavoritesRoute = async (req, res, next) => {
  const loggedUserId = req.user.name;
  const movieId = req.body?.movie_id;
  if (!movieId) {
    next(
      new CustomError("The movie id has not been provided accordingly", 400)
    );
  }
  try {
    await addUserMovieQuery(loggedUserId, movieId);
  } catch (error) {
    console.log(error);
    next(error);
  }
  res.status(200).json("Successfully added movie to favorites");
};
