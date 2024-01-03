import { getMovieQuery } from "../queries/getQueries";

export const getMovieRoute = async (req, res, next) => {
  const movieId = req.params?.id;
  if (isNaN(Number(movieId))) {
    next(new CustomError("The movie id must be a number", 400));
    return;
  }
  try {
    const movieData = await getMovieQuery(movieId);
    if (movieData === undefined) {
      res.status(200).json(`There is no movie with id ${movieId}`);
      return;
    }
    res.status(200).json(movieData);
  } catch (error) {
    next(error);
  }
};
