const mongoose = require("mongoose");

const webListingSchema = new mongoose.Schema({}, { strict: false });

const webListingModel = mongoose.model("webListing", webListingSchema);

module.exports = { webListingModel };
