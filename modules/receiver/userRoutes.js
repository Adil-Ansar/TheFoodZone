const userRoutes = require("express").Router();

const {
    signUp,
    signIn
} = require("./userHandler")

userRoutes.post("/signup", signUp);
userRoutes.post("/signin", signIn);


module.exports = userRoutes;