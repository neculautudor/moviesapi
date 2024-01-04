import { pool } from "../../../app";

export const deleteMovieQuery = async (movieId: number) => {
  try {
    const result = await pool.query("DELETE FROM movies WHERE id = $1", [
      movieId,
    ]);
    return result?.rowCount;
  } catch (error) {
    throw error;
  }
};
