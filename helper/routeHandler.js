const baseRouter = require("express").Router();

const basePath = "/payment";

const payerRoutes = require("../modules/payer/payerRoutes");
const receiverRoutes = require("../modules/receiver/receiverRoutes");

baseRouter.use("/payer", payerRoutes);
baseRouter.use("/receiver", receiverRoutes);

module.exports = {
    baseRouter,
    basePath
}