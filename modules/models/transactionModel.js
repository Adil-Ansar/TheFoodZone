const mongoose = require("mongoose");

const transactionModel = mongoose.model(
    "transaction",
    new mongoose.Schema(
        {
            //transaction
            transactionId: { type: mongoose.Schema.Types.ObjectId, auto: true },
            payerId: { type: mongoose.Schema.Types.ObjectId },
            payerName: { type: String },
            receiverId: { type: mongoose.Schema.Types.ObjectId },
            receiverName: { type: String },
            //payment
            paymentMethod: { type: String, enum: ["offline", "online"] },
            subPaymentMethod: { type: String, enum: ["creditCard", "debitCard", "bankTransfer", "NA"] },
            amount: { type: Number },

            createdAt: Number,
            updatedAt: Number,
        },
        { timestamps: true }
    )
);

module.exports = { transactionModel };