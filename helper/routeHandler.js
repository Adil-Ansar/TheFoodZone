const baseRouter = require("express").Router();

const basePath = "/foodzone";

const userRoutes = require("../modules/user/userRoutes");
const webListRoutes = require("../modules/webListing/webListingRoutes");

baseRouter.use("/user", userRoutes);
baseRouter.use("/web", webListRoutes);


module.exports = {
    baseRouter,
    basePath
}