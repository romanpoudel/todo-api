const config = {
  serverPort: process.env.SERVER_PORT|| 8000,
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m",
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d",
  },
  environment: process.env.NODE_ENV || "development",
  database:{
    charset: "utf8",
    client: process.env.DB_CLIENT,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    timezone: "UTC",
    user: process.env.DB_USER,
  }
};

export default config;