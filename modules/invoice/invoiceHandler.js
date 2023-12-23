const { transactionModel } = require("../models/transactionModel");
const { userModel } = require("../models/userModel");

const payment = async (req, res) => {
    try {
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

        const updatePayerAmount = await userModel.findOneAndUpdate(
            { userId: payerId },
            {
                $inc: { amount: -amount }
            }
        );
        const updateRecieverAmount = await userModel.findOneAndUpdate(
            { userId: receiverId },
            {
                $inc: { amount: amount }
            }
        );

        const createTransaction = transactionModel.create({
            payerId,
            payerName: findPayer.name,
            receiverId,
            receiverName: findReceiver.name,
            paymentMethod,
            subPaymentMethod: paymentMethod === "online" ? subPaymentMethod : "NA",
            amount,
        })
        return res.status(500).json({
            meta: { msg: "Something went wrong", status: false },
            data: userId
        })


    } catch (error) {
        return res.status(500).json({
            meta: { msg: "Something went wrong", status: false },
            data: error.msg
        })
    }
}

module.exports = {
    payment
}