import { pool } from "../../../app";
import { CustomError } from "../../errors/errorTypes";

export const deleteUserMovieQuery = async (userId: number, movieId: number) => {
  try {
    const queryResult = await pool.query(
      "DELETE FROM users_movies WHERE user_id = $1 AND movie_id = $2",
      [userId, movieId]
    );
    if (!queryResult?.rowCount) {
      throw new CustomError("Movie is not in the favorites list", 404);
    }
  } catch (error) {
    throw error;
  }
};
