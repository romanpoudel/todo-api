import "dotenv/config";
import { app } from "./app";
import config from "./config";

app.listen(config.serverPort, () => {
  console.log(`Server is listening on port ${config.serverPort}`);
});
