const baseRouter = require("express").Router();

const basePath = "/payment";

const payerRoutes = require("../modules/payer/payerRoutes");
const receiverRoutes = require("../modules/receiver/receiverRoutes");
const adminRoutes = require("../modules/admin/adminRoutes");

baseRouter.use("/payer", payerRoutes);
baseRouter.use("/receiver", receiverRoutes);
baseRouter.use("/admin", adminRoutes);

module.exports = {
    baseRouter,
    basePath
}