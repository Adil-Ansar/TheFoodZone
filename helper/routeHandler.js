const baseRouter = require("express").Router();

const basePath = "/payment";

const userRoutes = require("../modules/user/userRoutes")
const adminRoutes = require("../modules/admin/adminRoutes");
const invoiceRoutes = require("../modules/invoice/invoiceRoutes")

baseRouter.use("/admin", adminRoutes);
baseRouter.use("/user", userRoutes);
baseRouter.use("/invoice", invoiceRoutes);


module.exports = {
    baseRouter,
    basePath
}