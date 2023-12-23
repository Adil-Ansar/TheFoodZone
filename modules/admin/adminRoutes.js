const adminRoutes = require("express").Router();
const { isAuthenticatedUSer } = require("../../helper/authHandler");

const {
    signUp,
    signIn,
    getUserList,
    // getUserDetails,
    // getTransaciotnList,
    // getTransaciotnDetails,
    // updateUserDetails
} = require("./adminHandler")

adminRoutes.post("/signup", signUp);
adminRoutes.post("/signin", signIn);
adminRoutes.get("/getuserlist", isAuthenticatedUSer, getUserList);
// adminRoutes.get("/getuserdetails", getUserDetails);
// adminRoutes.get("/gettransaciotnlist", getTransaciotnList);
// adminRoutes.get("/gettransaciotndetails", getTransaciotnDetails);
// adminRoutes.get("/updateuserdetails", updateUserDetails);


module.exports = adminRoutes;