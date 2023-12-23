const receiverRoutes = require("express").Router();

const {
    signUp,
    signIn
} = require("./receiverHandler")

receiverRoutes.post("/signup", signUp);
receiverRoutes.post("/signin", signIn);


module.exports = receiverRoutes;