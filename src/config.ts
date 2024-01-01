const config = {
  serverPort: process.env.SERVER_PORT|| 8000,
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m",
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d",
  },
  environment: process.env.NODE_ENV || "development",
};

export default config;