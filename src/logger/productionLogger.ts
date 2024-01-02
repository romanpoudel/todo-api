import {createLogger} from "winston";
import { format ,transports} from "winston";

const { timestamp,printf,combine } = format;


const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const productionLogger = () => {
  return createLogger({
    level: "info",
    format: combine(
      timestamp(),
      myFormat,
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: "error.log"}),
    ],
  });
};

export default productionLogger;