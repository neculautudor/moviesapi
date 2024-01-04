import { CustomError } from "../errors/errorTypes";
import { deleteMovieQuery } from "../queries/movieQueries/deleteQueries";

export const deleteMovieRoute = async (req, res, next) => {
  const movieId = req.params?.id;
  if (isNaN(Number(movieId))) {
    next(new CustomError("The movie id must be a number", 400));
    return;
  }
  try {
    const affectedRows = await deleteMovieQuery(movieId);
    if (affectedRows === 0) {
      next(new CustomError(`Movie with id ${movieId} does not exist`, 400));
      return;
    }
    res.status(200).json(`Deleted movie ${movieId}`);
  } catch (error) {
    next(error);
  }
};
