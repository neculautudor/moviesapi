import { pool } from "../../../app";
export const getUserData = async (username: string) => {
  const userData = await pool.query(
    "SELECT id, password_hash FROM users WHERE username = $1",
    [username]
  );
  return userData.rows[0];
};

export const getIsUserPrivate = async (userId: number) => {
  try {
    const isPrivate = await pool.query(
      "SELECT is_private FROM users WHERE id = $1",
      [userId]
    );
    console.log(userId, isPrivate);
    return isPrivate?.rows?.[0]?.is_private;
  } catch (error) {
    throw error;
  }
};
