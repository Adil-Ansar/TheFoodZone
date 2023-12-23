const invoiceRoutes = require("express").Router();
const { isAuthenticatedUSer } = require("../../helper/authHandler");

const {
    payment
} = require("./invoiceHandler")

invoiceRoutes.post("/payment",isAuthenticatedUSer, payment);


module.exports = invoiceRoutes;