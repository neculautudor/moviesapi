import { CustomError } from "../../errors/errorTypes";
import { getUserFavoritesQuery } from "../../queries/movieQueries/getQueries";

export const getUserFavoritesRoute = async (req, res, next) => {
  const userId = req?.params?.id;
  if (!userId || isNaN(Number(userId))) {
    next(new CustomError("The user id must be a number", 400));
    return;
  }
  try {
    const movieData = await getUserFavoritesQuery(userId);
    res.status(200).json({ userFavorites: movieData });
  } catch (error) {
    next(error);
  }
};
