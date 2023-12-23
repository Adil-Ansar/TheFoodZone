const adminRoutes = require("express").Router();

const {
    signUp,
    signIn
} = require("./adminHandler")

adminRoutes.post("/signup", signUp);
adminRoutes.post("/signin", signIn);


module.exports = adminRoutes;