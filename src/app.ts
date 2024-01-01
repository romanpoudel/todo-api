import express from "express";
import userRouter from "./routes/user.route";
import todoRouter from "./routes/todo.route";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos",todoRouter);

export { app };
