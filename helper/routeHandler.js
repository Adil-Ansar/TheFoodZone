const baseRouter = require("express").Router();

const basePath = "/payment";

// const userRoutes = require("../modules/user/userRoutes");
const payerRoutes = require("../modules/payer/payerRoutes")

baseRouter.use("/payer", payerRoutes);

module.exports = {
    baseRouter,
    basePath
}