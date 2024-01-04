import { pool } from "../../../app";
export const getUserData = async (username: string) => {
  const userData = await pool.query(
    "SELECT id, password_hash FROM users WHERE username = $1",
    [username]
  );
  return userData.rows[0];
};
