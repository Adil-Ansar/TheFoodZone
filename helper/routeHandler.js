const baseRouter = require("express").Router();

const basePath = "/payment";

const userRoutes = require("../modules/user/userRoutes")

baseRouter.use("/user", userRoutes);


module.exports = {
    baseRouter,
    basePath
}