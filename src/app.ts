import dotenv from "dotenv";
dotenv.config();
import express from "express";
import router from "./router/index.router";
import MongoConnect from "./database/connect.database";
const app = express();

MongoConnect();
app.use(express.json());

app.use(router);

export default app;
