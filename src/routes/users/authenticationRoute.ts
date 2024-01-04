import { CustomError } from "../../errors/errorTypes";
import { getUserData } from "../../queries/userQueries/getQueries";
import { generateToken } from "../../utils/generateToken";
import { isUserLogin } from "../../utils/typeGuards";
import bcrypt from "bcrypt";

export const authenticationRoute = async (req, res, next) => {
  const loginData = req.body;
  if (!isUserLogin(loginData)) {
    next(
      new CustomError("Login data is incomplete or types are not matching", 400)
    );
    return;
  }
  try {
    const userData = await getUserData(loginData.username);
    if (!userData) {
      next(new CustomError("Username does not exist", 400));
      return;
    }
    const compareResult = await bcrypt.compare(
      loginData.password,
      userData.password_hash
    );
    if (!compareResult) {
      next(new CustomError("Password is incorrect", 400));
      return;
    }
    const jwt = await generateToken(loginData.username);
    res.status(200).json({ token: jwt, userId: userData.id });
    return;
    // if (!userExists) {
    //   next(new CustomError("Username or password is incorrect", 400));
    // }
    // const jsonWebToken = await generateToken(loginData.username);
    // res.status(200).json({ token: jsonWebToken, userId: userExists });
  } catch (error) {
    next(error);
  }
};
