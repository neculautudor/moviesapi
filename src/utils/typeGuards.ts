import { CredentialsType, MovieType, UploadMovieType, UserType } from "./types";
import emailValidator from "email-validator";
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

export const isUserType = (user: any): user is UserType =>
  typeof user === "object" &&
  user !== null &&
  user.hasOwnProperty("username") &&
  typeof user.username === "string" &&
  user.hasOwnProperty("email") &&
  typeof user.email === "string" &&
  emailValidator.validate(user.email) &&
  user.hasOwnProperty("password") &&
  typeof user.password === "string" &&
  user.hasOwnProperty("first_name") &&
  typeof user.first_name === "string" &&
  user.hasOwnProperty("last_name") &&
  typeof user.last_name === "string";

export const isUserLogin = (credentials: any): credentials is CredentialsType =>
  typeof credentials === "object" &&
  credentials !== null &&
  credentials.hasOwnProperty("username") &&
  typeof credentials.username === "string" &&
  credentials.hasOwnProperty("password") &&
  typeof credentials.password === "string";
