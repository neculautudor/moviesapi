import jwt from "jsonwebtoken";
import { CustomError } from "../errors/errorTypes";

export const checkJWT = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    next(
      new CustomError(
        "No authorization token has been added to the request header",
        400
      )
    );
    return;
  }
  await jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      next(err);
      return;
    }
    req.user = decoded;
  });
  next();
};
