import jwt from "jsonwebtoken";
export const generateToken = async (username: string) => {
  const token = await jwt.sign({ name: username }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
