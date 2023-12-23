const adminRoutes = require("express").Router();
const { isAuthenticatedUSer } = require("../../helper/authHandler");

const {
    signUp,
    signIn,
    getUserList,
    getUserDetails,
    getTransaciotnList,
    getTransaciotnDetails,
    updateUserDetails,
    deleteUser
} = require("./adminHandler")

adminRoutes.post("/signup", signUp);
adminRoutes.post("/signin", signIn);
adminRoutes.get("/getuserlist", isAuthenticatedUSer, getUserList);
adminRoutes.get("/getuserdetails/:userId", isAuthenticatedUSer, getUserDetails);
adminRoutes.get("/gettransaciotnlist", isAuthenticatedUSer, getTransaciotnList);
adminRoutes.get("/gettransaciotndetails/:transactionId", isAuthenticatedUSer, getTransaciotnDetails);
adminRoutes.put("/updateuserdetails", isAuthenticatedUSer, updateUserDetails);
adminRoutes.delete("/deleteuser/:userId", isAuthenticatedUSer, deleteUser);


module.exports = adminRoutes;