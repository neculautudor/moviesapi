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
