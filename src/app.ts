import dotenv from "dotenv";
dotenv.config();
import express from "express";
import blogRouter from "./router/blog.router";
import userRouter from "./router/user.router";
import MongoConnect from "./database/connect.database";
import cors from "cors";
const app = express();

app.use(express.static(__dirname + "../../" + "/public"));

app.use(cors());
MongoConnect();
app.use(express.json());

app.use("/posts", blogRouter);
app.use("/users", userRouter);

export default app;
