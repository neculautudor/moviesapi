import jwt from "jsonwebtoken";
export const generateToken = async (id: string) => {
  const token = await jwt.sign({ name: id }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
