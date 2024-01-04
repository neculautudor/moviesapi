import { CustomError } from "../../errors/errorTypes";
import { getUserFavoritesQuery } from "../../queries/movieQueries/getQueries";
import { getIsUserPrivate } from "../../queries/userQueries/getQueries";

export const getUserFavoritesRoute = async (req, res, next) => {
  const targetUserId = Number(req?.params?.id);
  if (!targetUserId || isNaN(targetUserId)) {
    next(new CustomError("The user id must be a number", 400));
    return;
  }
  const loggedUserId = req.user.name;
  const isUserPrivate = await getIsUserPrivate(targetUserId);
  //   console.log(isUserPrivate);
  if (isUserPrivate && targetUserId !== loggedUserId) {
    next(
      new CustomError(
        "This user is private, you cannot see their list of movies"
      ),
      401
    );
  }

  try {
    const movieData = await getUserFavoritesQuery(targetUserId);
    res.status(200).json({ userFavorites: movieData });
  } catch (error) {
    next(error);
  }
};
