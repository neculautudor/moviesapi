import { isMovieType } from "../configs/typeGuards";
import { updateMovieQuery } from "../queries/putQueries";

export const updateMovieRoute = async (req, res) => {
  const movieId = req.params?.id;
  const updateData = req.body;
  if (isNaN(Number(movieId))) {
    res.status(400).json("The movie id must be a number");
    return;
  }
  if (!isMovieType(req.body)) {
    res
      .status(400)
      .json("The movie data is incomplete or types are not matching");
    return;
  }
  try {
    await updateMovieQuery(movieId, updateData);
    res.status(200).json(`Updated movie ${movieId}`);
  } catch (error) {
    res.status(500).send(error);
  }
};
