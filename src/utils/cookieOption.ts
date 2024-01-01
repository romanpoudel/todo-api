import config from "../config";

export const options = {
    httpOnly: true,
    secure: config.environment === "production" ? true : false,
};