const mongoose = require("mongoose");

const userModel = mongoose.model(
    "user",
    new mongoose.Schema(
        {
            //user
            userId: { type: mongoose.Schema.Types.ObjectId, auto: true },
            name: { type: String },
            email: { type: String },
            password: { type: String },
            amount: { type: Number, default: 0 },

            createdAt: Number,
            updatedAt: Number,
        },
        { timestamps: true }
    )
);

module.exports = { userModel };