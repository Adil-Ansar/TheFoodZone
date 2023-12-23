const adminRoutes = require("express").Router();
const { isAuthenticatedUSer } = require("../../helper/authHandler");

const {
    signUp,
    signIn,
    getUserList,
    getUserDetails,
    // getTransaciotnList,
    // getTransaciotnDetails,
    // updateUserDetails,
    // deleteUser
} = require("./adminHandler")

adminRoutes.post("/signup", signUp);
adminRoutes.post("/signin", signIn);
adminRoutes.get("/getuserlist", isAuthenticatedUSer, getUserList);
adminRoutes.get("/getuserdetails/:userId", isAuthenticatedUSer, getUserDetails);
// adminRoutes.get("/gettransaciotnlist", isAuthenticatedUSer, getTransaciotnList);
// adminRoutes.get("/gettransaciotndetails", isAuthenticatedUSer, getTransaciotnDetails);
// adminRoutes.get("/updateuserdetails", isAuthenticatedUSer, updateUserDetails);
// adminRoutes.get("/deleteuser", isAuthenticatedUSer, deleteUser);


module.exports = adminRoutes;