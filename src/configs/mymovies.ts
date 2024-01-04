import { pool } from "../../app";

const createGenderType = `
CREATE TYPE gender AS ENUM (
    'MALE',
    'FEMALE'
)
`;
const createTableActors = `
CREATE TABLE IF NOT EXISTS actors (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    gender gender,
    birthdate DATE,
    nationality VARCHAR(50),
    oscars_won INTEGER,
    last_name VARCHAR(50)
)
`;
const createTableMovieStudios = `
CREATE TABLE IF NOT EXISTS movie_studios (
    id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    founded_date DATE,
    headquarters_location VARCHAR(255),
    total_movies INTEGER,
    website_url VARCHAR(255)
)
`;

const createTableDirectors = `
CREATE TABLE IF NOT EXISTS directors (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    birth_date DATE,
    nationality VARCHAR(50),
    awards_won INTEGER,
    biography TEXT
)
`;
const createTableMovies = `
CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    release_date DATE,
    duration_minutes INTEGER,
    studio_id INTEGER REFERENCES movie_studios(id)
)
`;
const createTableMovieActors = `
CREATE TABLE IF NOT EXISTS movie_actors (
    movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
    actor_id INTEGER REFERENCES actors(id) ON DELETE CASCADE
)
`;

const createTableMovieDirectors = `
CREATE TABLE IF NOT EXISTS movie_directors (
    movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
    director_id INTEGER REFERENCES directors(id) ON DELETE CASCADE
)
`;

const createTableUsers = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;
const createTableUserFavorites = `
    CREATE TABLE IF NOT EXISTS users_movies (
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
        UNIQUE (user_id, movie_id)
    )
`;
export const createDatabase = async () => {
  try {
    await pool.query(createGenderType);
    await pool.query(createTableActors);
    await pool.query(createTableMovies);
    await pool.query(createTableDirectors);
    await pool.query(createTableMovieStudios);
    await pool.query(createTableMovieActors);
    await pool.query(createTableMovieDirectors);
    await pool.query(createTableUsers);
    await pool.query(createTableUserFavorites);
  } catch (error) {
    throw error;
  }
};
