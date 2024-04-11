const userRoutes = require("express").Router();
const { isAuthenticatedUSer } = require("../../helper/authHandler");

const {
    signUp,
    signIn,
    getUserDetails,
    updateUserDetails,
    deleteAccount
} = require("./userHandler")

userRoutes.post("/signup", signUp);
userRoutes.post("/signin", signIn);
userRoutes.get("/getuserdetails", isAuthenticatedUSer, getUserDetails);
userRoutes.put("/updateuserdetails", isAuthenticatedUSer, updateUserDetails);
userRoutes.delete("/deleteaccount", isAuthenticatedUSer, deleteAccount);

module.exports = userRoutes;