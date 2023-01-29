/* eslint-disable indent */
import { mongoose, connect } from "mongoose";
import express from "express";
const app = express();
const port = process.env.PORT || 27017;

mongoose.set("strictQuery", true);

function MongoConnect() {
    connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wvthnwq.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(port, () => {
            console.log(`Database connected! port: ${port}`);
        });
    })
    .catch((err) => {
        console.log({database_connect_error: err});
    });
}

export default MongoConnect;
