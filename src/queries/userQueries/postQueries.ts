import { pool } from "../../../app";
import { UserType } from "../../utils/types";
import { hashPassword } from "../../utils/hashPassword";

export const addUserQuery = async ({
  email,
  first_name,
  last_name,
  password,
  username,
}: UserType) => {
  const password_hash = await hashPassword(password);
  try {
    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash, first_name, last_name) 
        VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [username, email, password_hash, first_name, last_name]
    );
    return result.rows[0].id;
  } catch (error) {
    throw error;
  }
};
