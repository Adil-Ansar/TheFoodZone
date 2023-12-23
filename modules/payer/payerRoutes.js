const payerRoutes = require("express").Router();

const {
    signUp,
    signIn
} = require("./payerHandler")

payerRoutes.post("/signup", signUp);
payerRoutes.post("/signin", signIn);


module.exports = payerRoutes;