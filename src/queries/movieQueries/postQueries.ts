import { pool } from "../../../app";
import {
  MovieActorsType,
  MovieDirectorsType,
  MovieType,
} from "../../utils/types";

export const addMovieQuery = async ({
  name,
  description,
  release_date,
  studio_id,
  duration_minutes,
}: MovieType) => {
  try {
    const movieInsertResult = await pool.query(
      "INSERT INTO movies (name, description, release_date, studio_id, duration_minutes) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [name, description, release_date, studio_id, duration_minutes]
    );
    return movieInsertResult.rows[0].id;
  } catch (error) {
    throw error;
  }
};

export const addMovieActorsQuery = async ({
  movie_id,
  actor_ids,
}: MovieActorsType) => {
  actor_ids.forEach((actorId) => {
    try {
      pool.query(
        "INSERT INTO movie_actors (movie_id, actor_id) VALUES ($1, $2)",
        [movie_id, actorId]
      );
    } catch (error) {
      throw error;
    }
  });
};

export const addMovieDirectorsQuery = async ({
  movie_id,
  director_ids,
}: MovieDirectorsType) => {
  director_ids.forEach((director_id) => {
    try {
      pool.query(
        "INSERT INTO movie_directors (movie_id, director_id) VALUES ($1, $2)",
        [movie_id, director_id]
      );
    } catch (error) {
      throw error;
    }
  });
};
