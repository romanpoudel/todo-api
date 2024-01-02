import {createLogger} from "winston";
import { format ,transports} from "winston";

const { timestamp,printf,combine,colorize } = format;


const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const developmentLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(
      colorize(),
      timestamp({ format: "HH:mm:ss" }),
      myFormat,
    ),
    transports: [
      new transports.Console(),
    ],
  });
};

export default developmentLogger;
