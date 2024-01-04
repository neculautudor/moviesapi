import { isUserType } from "../../utils/typeGuards";
import { addUserQuery } from "../../queries/userQueries/postQueries";
import { CustomError } from "../../errors/errorTypes";

export const createAccountRoute = async (req, res, next) => {
  const userData = req.body;
  if (!isUserType(userData)) {
    next(new CustomError("User data missing or not matching type", 400));
    return;
  }
  try {
    const userId = await addUserQuery(userData);
    res.status(201).send(`Successfully added user with id ${userId}`);
  } catch (error) {
    next(error);
  }
};
