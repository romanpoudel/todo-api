import jwt from "jsonwebtoken";
import config from "../config";
import { User } from "../types/user";

const generateAccessAndRefreshToken = (user: User) => {
  const accessToken = jwt.sign(user, config.jwt.accessTokenSecret!, {
    expiresIn: config.jwt.accessTokenExpiresIn,
  });
  const refreshToken = jwt.sign(
    { id: user.id },
    config.jwt.refreshTokenSecret!,
    {
      expiresIn: config.jwt.refreshTokenExpiresIn,
    }
  );
  return { accessToken, refreshToken };
};

export default generateAccessAndRefreshToken;
