import { AppDataSource } from "./typeORMTest";

export const addEntity = async (entity, model) => {
  const repository = await AppDataSource.getRepository(model);
  try {
    await repository.save(entity);
  } catch (error) {
    throw error;
  }
};
