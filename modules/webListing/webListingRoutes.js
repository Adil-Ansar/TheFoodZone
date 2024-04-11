const webListingRoutes = require("express").Router();
const { isAuthenticatedUSer } = require("../../helper/authHandler");

const {
    webList
} = require("./webListing")

webListingRoutes.get("/list", webList);

module.exports = webListingRoutes;