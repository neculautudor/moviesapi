import { pool } from "../../../app";

export const getMovieQuery = async (movieId: number) => {
  try {
    const queryResult = await pool.query("SELECT * FROM movies WHERE id = $1", [
      movieId,
    ]);
    return queryResult?.rows?.[0];
  } catch (error) {
    throw error;
  }
};

export const getUserFavoritesQuery = async (userId: number) => {
  try {
    const userFavoriteMovies = await pool.query(
      "SELECT m.* FROM users_movies um JOIN movies m ON um.movie_id = m.id WHERE um.user_id = $1",
      [userId]
    );
    return userFavoriteMovies?.rows;
  } catch (error) {
    throw error;
  }
};
