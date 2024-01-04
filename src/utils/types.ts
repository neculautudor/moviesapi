export type MovieType = {
  name: string;
  description: string;
  release_date: Date;
  studio_id: number;
  duration_minutes: number;
};
export type UploadMovieType = MovieType & {
  actor_ids: Number[];
  director_ids: Number[];
};
export type UpdateMovieType = {
  name?: string;
  description?: string;
  release_date?: Date;
  studio_id?: number;
  duration_minutes?: number;
};

export type MovieActorsType = {
  movie_id: number;
  actor_ids: number[];
};

export type MovieDirectorsType = {
  movie_id: number;
  director_ids: number[];
};

export type UserType = {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

export type CredentialsType = {
  username: string;
  password: string;
};
