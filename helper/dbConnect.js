const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        console.log("Establishing Mongo DB Connection...");
        console.log("process.env.DB_URL", process.env.DB_URL)
        await mongoose.connect(process.env.DB_URL)
        console.log("Connection established.")
    } catch (error) {
        console.log("==== DB Connection Error ====", error.message);
        throw error;
    }
}

module.exports = {
    dbConnect,
    mongoose
};