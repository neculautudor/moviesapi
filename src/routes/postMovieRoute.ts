import { isUploadMovieType } from "../utils/typeGuards";
import {
  addMovieActorsQuery,
  addMovieDirectorsQuery,
  addMovieQuery,
} from "../queries/movieQueries/postQueries";
import { CustomError } from "../errors/errorTypes";

export const postMovieRoute = async (req, res, next) => {
  if (!isUploadMovieType(req.body)) {
    next(
      new CustomError(
        "The movie data is incomplete or types are not matching",
        400
      )
    );
    return;
  }
  const {
    name,
    description,
    release_date,
    studio_id,
    duration_minutes,
    actor_ids,
    director_ids,
  } = req.body;
  try {
    const movie_id = await addMovieQuery({
      name,
      description,
      release_date,
      studio_id,
      duration_minutes,
    });
    await addMovieActorsQuery({ movie_id, actor_ids });
    await addMovieDirectorsQuery({ movie_id, director_ids });
    res.status(201).json(`Added movie with id ${movie_id}`);
  } catch (error) {
    next(error);
  }
};
