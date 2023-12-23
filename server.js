const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const server = express();
const { dbConnect } = require("./helper/dbConnect");

const { baseRouter, basePath } = require("./helper/routeHandler");

server.use(bodyParser.json({ limit: "100mb" }));
server.use(bodyParser.urlencoded({ extended: true }));

dotenv.config({ path: "config.env" });

server.get("/", (req, res) => {
    res.send("I am a server");
});

server.use(basePath, baseRouter);

server.use((req, res, next) => {
    const error = new Error("Route Not found.. to");
    error.status = 404;
    next(error);
});

server.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: { message: error.message } });
});

dbConnect();
server.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
