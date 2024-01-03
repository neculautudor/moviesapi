import { deleteMovieQuery } from "../queries/deleteQueries";
import { getMovieQuery } from "../queries/getQueries";
import {
  addMovieActorsQuery,
  addMovieDirectorsQuery,
  addMovieQuery,
} from "../queries/postQueries";
import { updateMovieQuery } from "../queries/putQueries";
import { isMovieType, isUploadMovieType } from "../configs/typeGuards";

export const addMovie = async (req, res) => {
  if (!isUploadMovieType(req.body)) {
    res
      .status(400)
      .json("The movie data is incomplete or types are not matching");
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
    res.status(500).json(error);
  }
};

export const deleteMovie = async (req, res) => {
  const movieId = req.params?.id;
  if (isNaN(Number(movieId))) {
    res.status(400).json("The movie id must be a number");
    return;
  }
  try {
    const affectedRows = await deleteMovieQuery(movieId);
    if (affectedRows === 0) {
      res.status(400).json(`Movie with id ${movieId} does not exist`);
      return;
    }
    res.status(200).json(`Deleted movie ${movieId}`);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMovie = async (req, res) => {
  const movieId = req.params?.id;
  if (isNaN(Number(movieId))) {
    res.status(400).json("The movie id must be a number");
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
    res.status(500).json(error);
  }
};

export const updateMovie = async (req, res) => {
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
