import "dotenv/config";
import { app } from "./app";
import config from "./config";
import logger from "./logger";

app.listen(config.serverPort, () => {
  logger.info(`Server is listening on port ${config.serverPort}`);
});
