const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { baseRouter, basePath } = require("./helper/routeHandler");

const app = express();

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config({ path: "config.env" });

app.get("/", (req, res) => {
    res.send("I am a server");
});

app.use(basePath, baseRouter);

app.use((req, res, next) => {
    const error = new Error("Route Not found.. to");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: { message: error.message } });
});

module.exports = app;
