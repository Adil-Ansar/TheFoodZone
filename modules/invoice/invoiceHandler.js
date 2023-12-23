const { transactionModel } = require("../models/transactionModel");
const { userModel } = require("../models/userModel");
const { mongoose } = require("../../helper/dbConnect");

const payment = async (req, res) => {

    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const { userId: payerId } = req.decoded;
        const { receiverId, paymentMethod, subPaymentMethod, amount } = req.body;

        if (!receiverId || !paymentMethod || !amount) {
            return res.status(400).json({
                meta: { msg: "Parameter missing.", status: false },
            });
        };

        const findPayer = await userModel.findOne({ userId: payerId });
        const findReceiver = await userModel.findOne({ userId: receiverId });
        if (!findPayer) {
            return res.status(400).json({
                meta: { msg: "User not founc", status: false },
            });
        }
        if (!findReceiver) {
            return res.status(400).json({
                meta: { msg: "Receiver not founc", status: false },
            });
        }

        await userModel.findOneAndUpdate(
            { userId: payerId },
            {
                $inc: { amount: -amount }
            },
            {
                session
            }
        );
        await userModel.findOneAndUpdate(
            { userId: receiverId },
            {
                $inc: { amount: amount }
            },
            {
                session
            }
        );

        const createTransaction = await transactionModel.create([{
            payerId,
            payerName: findPayer.name,
            receiverId,
            receiverName: findReceiver.name,
            paymentMethod,
            subPaymentMethod: paymentMethod === "online" ? subPaymentMethod : "NA",
            amount,
        }], {
            session
        });

        await session.commitTransaction()
        return res.status(201).json({
            meta: { msg: "Payment has been successfully processed.", status: true },
            data: createTransaction
        })
    } catch (error) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        return res.status(500).json({
            meta: { msg: "Something went wrong.", status: false },
            data: error.message 
        });
    }
}

module.exports = {
    payment
}