import dotenv from "dotenv";
dotenv.config();
import express from "express";
import blogRouter from "./router/blog.router";
import userRouter from "./router/user.router";
import MongoConnect from "./database/connect.database";
const app = express();

MongoConnect();
app.use(express.json());

app.use(blogRouter);
app.use(userRouter);

export default app;
