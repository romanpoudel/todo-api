import express from "express";
import userRouter from "./routes/user.route";
import todoRouter from "./routes/todo.route";

const app = express();

app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos",todoRouter);

export { app };
