import { MovieType, UploadMovieType } from "./types";

export const isUploadMovieType = (movie: any): movie is UploadMovieType => {
  const date = new Date(movie?.release_date);
  return (
    typeof movie === "object" &&
    movie !== null &&
    movie.hasOwnProperty("name") &&
    typeof movie.name === "string" &&
    movie.hasOwnProperty("description") &&
    typeof movie.name === "string" &&
    movie.hasOwnProperty("release_date") &&
    !isNaN(date.getTime()) &&
    movie.hasOwnProperty("studio_id") &&
    typeof movie.studio_id === "number" &&
    movie.hasOwnProperty("duration_minutes") &&
    typeof movie.duration_minutes === "number" &&
    movie.hasOwnProperty("actor_ids") &&
    Array.isArray(movie.actor_ids) &&
    movie.actor_ids.every((num) => typeof num === "number") &&
    movie.hasOwnProperty("director_ids") &&
    Array.isArray(movie.director_ids) &&
    movie.director_ids.every((num) => typeof num === "number")
  );
};

export const isMovieType = (movie: any): movie is MovieType =>
  typeof movie === "object" &&
  movie !== null &&
  !(movie.hasOwnProperty("name") && typeof movie.name !== "string") &&
  !(movie.hasOwnProperty("description") && typeof movie.name !== "string") &&
  !(
    movie.hasOwnProperty("release_date") &&
    !(movie.release_date instanceof Date)
  ) &&
  !(movie.hasOwnProperty("studio_id") && typeof movie.studio_id !== "number") &&
  !(
    movie.hasOwnProperty("duration_minutes") &&
    typeof movie.duration_minutes !== "number"
  );
