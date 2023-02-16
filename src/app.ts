import dotenv from "dotenv";
dotenv.config();
import express from "express";
import blogRouter from "./router/blog.router";
import userRouter from "./router/user.router";
import MongoConnect from "./database/connect.database";
import cors from "cors";
import fs from "fs";
const app = express();
const publicExists = fs.existsSync("./public");
const uploadExists = fs.existsSync("./public/uploads");

app.use(express.static("public"));

if(!publicExists) {
    fs.mkdirSync("./public");
}
if(!uploadExists) {
    fs.mkdirSync("./public/uploads");
}

app.use(cors());
MongoConnect();
app.use(express.json());

app.use("/posts", blogRouter);
app.use("/users", userRouter);

export default app;
