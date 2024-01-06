import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "./models/users";
import dotenv from "dotenv";
import { addEntity } from "./addEntity";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: `${process.env.DB_PASSWORD}`,
  database: "mymovies",
  entities: [Users],
  synchronize: false,
  logging: false,
});

export const test = async () => {
  try {
    await AppDataSource.initialize();
    await addEntity(
      new Users(
        "typeorm",
        "typeorm@mailinator.com",
        "pass123",
        "typeorm_first",
        "typeorm_last",
        false
      ),
      Users
    );
  } catch (error) {
    throw error;
  }
};
