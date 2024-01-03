import { pool } from "../../app";
import { UpdateMovieType } from "../configs/types";

export const updateMovieQuery = async (
  movieId: number,
  newData: UpdateMovieType
) => {
  const { name, description, release_date, duration_minutes, studio_id } =
    newData;
  try {
    await pool.query(
      `UPDATE movies SET \
            name = COALESCE(NULLIF($2, ''), name),\
            description = COALESCE(NULLIF($3, ''), description),\
            release_date = COALESCE(NULLIF($4, '1000-01-01'::date), release_date),\
            duration_minutes = COALESCE(NULLIF($5, 0), duration_minutes),\
            studio_id = COALESCE(NULLIF($6, 0), studio_id)\
            WHERE id = $1 `,
      [
        movieId,
        name ?? "",
        description ?? "",
        release_date ?? "1000-01-01",
        duration_minutes ?? 0,
        studio_id ?? 0,
      ]
    );
    return movieId;
  } catch (error) {
    throw error;
  }
};
