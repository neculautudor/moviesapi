import { pool } from "../../../app";
import { UserType } from "../../utils/types";
import { hashPassword } from "../../utils/hashPassword";

export const addUserQuery = async ({
  email,
  first_name,
  last_name,
  password,
  username,
  is_private,
}: UserType) => {
  const password_hash = await hashPassword(password);
  try {
    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash, first_name, last_name, is_private) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [username, email, password_hash, first_name, last_name, is_private]
    );
    return result.rows[0].id;
  } catch (error) {
    throw error;
  }
};

export const addUserMovieQuery = async (userId: number, movieId: number) => {
  try {
    await pool.query(
      "INSERT INTO users_movies (user_id, movie_id) VALUES ($1, $2)",
      [userId, movieId]
    );
  } catch (error) {
    throw error;
  }
};
