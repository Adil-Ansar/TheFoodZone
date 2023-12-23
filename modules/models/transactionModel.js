const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        // Define transaction schema 
        transactionId: { type: mongoose.Schema.Types.ObjectId, auto: true },
        payerId: { type: mongoose.Schema.Types.ObjectId, required: true },
        payerName: { type: String, required: true },
        receiverId: { type: mongoose.Schema.Types.ObjectId, required: true },
        receiverName: { type: String, required: true },
        paymentMethod: {
            type: String,
            enum: ["offline", "online"],
            required: true,
        },
        subPaymentMethod: {
            type: String,
            enum: ["creditCard", "debitCard", "bankTransfer", "NA"],
            required: function () {
                return this.paymentMethod === "online";
            },
        },
        amount: { type: Number, required: true, min: 0 },
    },
    { timestamps: true }
);

const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports = { transactionModel };
