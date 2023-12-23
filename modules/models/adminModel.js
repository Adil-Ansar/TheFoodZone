const mongoose = require("mongoose");

const adminModel = mongoose.model(
    "admin",
    new mongoose.Schema(
        {
            //admin
            adminId: { type: mongoose.Schema.Types.ObjectId, auto: true },
            name: { type: String },
            email: { type: String },
            password: { type: String },

            createdAt: Number,
            updatedAt: Number,
        },
        { timestamps: true }
    )
);

module.exports = { adminModel };