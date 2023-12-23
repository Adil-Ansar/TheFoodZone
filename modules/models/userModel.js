const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        // Define user schema 
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: [2, "Name should have at least 2 characters"],
            maxlength: [50, "Name should not exceed 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password should have at least 6 characters"],
        },
        amount: {
            type: Number,
            default: 0,
            min: [0, "Amount should not be negative"],
        },
    },
    { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = { userModel };
