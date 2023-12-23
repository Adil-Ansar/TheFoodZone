const { adminModel } = require("../models/adminModel");
const { jwtToken, hashPassword, comparePasswords } = require("../../helper/comFun");
const { userModel } = require("../models/userModel");
const { transactionModel } = require("../models/transactionModel");


const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                meta: { msg: "Parameter missing.", status: false },
            });
        }

        const findAdmin = await adminModel.findOne({
            email
        })
        if (findAdmin) {
            return res.status(409).json({
                meta: { msg: "Admin already exists. Please use a different email or username.", status: false },
            });
        }

        const hashpassword = await hashPassword(password);
        const adminObj = {
            name,
            email,
            password: hashpassword
        }

        const admindata = await adminModel.create(adminObj);
        if (admindata) {
            return res.status(201).json({
                meta: { msg: "Admin created.", status: true },
                data: admindata
            });
        } else {
            return res.status(400).json({
                meta: { msg: "Something went wrong.", status: false },
            });
        }
    } catch (error) {
        return res.status(500).json({
            meta: { msg: "Something went wrong.", status: false },
            data: error.message
        });
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                meta: { msg: "Parameter missing.", status: false },
            });
        }

        const admindata = await adminModel.findOne({
            email
        })

        if (admindata) {
            const isCorrectPassword = await comparePasswords(password, admindata.password)
            if (!isCorrectPassword) {
                return res.status(200).json({
                    meta: { msg: "Invalid email or password. Please check your credentials and try again.", status: false }
                });
            }
            const token = await jwtToken({
                adminId: admindata.adminId,
                name: admindata.name,
                email: admindata.email
            });
            return res.status(200).json({
                meta: { msg: "Admin signIn successfully.", status: true },
                data: admindata,
                token
            });
        } else {
            return res.status(400).json({
                meta: { msg: "Admin not found", status: false },
            });
        }
    } catch (error) {
        return res.status(500).json({
            meta: { msg: "Something went wrong.", status: false },
            data: error.message
        });
    }
}

const getUserList = async (req, res) => {
    try {
        const { adminId } = req.decoded;

        const findAdmin = await adminModel.findOne({ adminId });
        if (!findAdmin) {
            return res.status(400).json({
                meta: { msg: "Admin not found", status: false },
            });
        };

        const findUserList = await userModel.find();

        if (findUserList.length) {
            return res.status(200).json({
                meta: { msg: "User list has been retrieved successfully.", status: true },
                data: findUserList
            });
        } else {
            return res.status(400).json({
                meta: { msg: "Unable to retrieve the user list at this time.", status: false },
            });
        }
    } catch (error) {
        return res.status(500).json({
            meta: { msg: "Something went wrong.", status: false },
            data: error.message
        });
    }
}

const getUserDetails = async (req, res) => {
    try {
        const { adminId } = req.decoded;
        const { userId } = req.params;

        const findAdmin = await adminModel.findOne({ adminId });
        if (!findAdmin) {
            return res.status(400).json({
                meta: { msg: "Admin not found", status: false },
            });
        };

        const findUser = await userModel.findOne({ userId });
        if (findUser) {
            return res.status(200).json({
                meta: { msg: "User has been retrieved successfully.", status: true },
                data: findUser
            });
        } else {
            return res.status(400).json({
                meta: { msg: "Unable to retrieve the user at this time.", status: false },
            });
        }
    } catch (error) {
        return res.status(500).json({
            meta: { msg: "Something went wrong.", status: false },
            data: error.message
        });
    }
}

const getTransaciotnList = async (req, res) => {
    try {
        const { adminId } = req.decoded;

        const findAdmin = await adminModel.findOne({ adminId });
        if (!findAdmin) {
            return res.status(400).json({
                meta: { msg: "Admin not found", status: false },
            });
        };

        const findTransactionList = await transactionModel.find();

        if (findTransactionList.length) {
            return res.status(200).json({
                meta: { msg: "TransactionList list has been retrieved successfully.", status: true },
                data: findTransactionList
            });
        } else {
            return res.status(400).json({
                meta: { msg: "Unable to retrieve the transactionList list at this time.", status: false },
            });
        }
    } catch (error) {
        return res.status(500).json({
            meta: { msg: "Something went wrong.", status: false },
            data: error.message
        });
    }
}

const getTransaciotnDetails = async (req, res) => {
    try {
        const { adminId } = req.decoded;
        const { transactionId } = req.params;

        const findAdmin = await adminModel.findOne({ adminId });
        if (!findAdmin) {
            return res.status(400).json({
                meta: { msg: "Admin not found", status: false },
            });
        };

        const findTransaction = await transactionModel.findOne({ transactionId });
        if (findTransaction) {
            return res.status(200).json({
                meta: { msg: "Transaction has been retrieved successfully.", status: true },
                data: findTransaction
            });
        } else {
            return res.status(400).json({
                meta: { msg: "Unable to retrieve the transaction at this time.", status: false },
            });
        }
    } catch (error) {
        return res.status(500).json({
            meta: { msg: "Something went wrong.", status: false },
            data: error.message
        });
    }
}

const updateUserDetails = async (req, res) => {
    try {
        const { adminId } = req.decoded;
        const { userId, name, email } = req.body;

        if (!userId) {
            return res.status(400).json({
                meta: { msg: "Parameter missing.", status: false },
            });
        }

        const findAdmin = await adminModel.findOne({ adminId });
        if (!findAdmin) {
            return res.status(400).json({
                meta: { msg: "Admin not found", status: false },
            });
        };

        const findUser = await userModel.findOne({ userId });
        if (!findUser) {
            return res.status(400).json({
                meta: { msg: "User not found", status: false },
            });
        };

        const updateObj = {
            ...userId && { userId },
            ...name && { name },
            ...email && { email }
        };
        const updateUser = await userModel.findOneAndUpdate({
            userId: userId
        }, {
            $set: updateObj
        }, {
            new: true
        })
        if (updateUser) {
            return res.status(200).json({
                meta: { msg: "User has been updated successfully.", status: true },
                data: updateUser
            });
        } else {
            return res.status(400).json({
                meta: { msg: "Unable to update the user at this time.", status: false },
            });
        }
    } catch (error) {
        return res.status(500).json({
            meta: { msg: "Something went wrong.", status: false },
            data: error.message
        });
    }
}

module.exports = {
    signUp,
    signIn,
    getUserList,
    getUserDetails,
    getTransaciotnList,
    getTransaciotnDetails,
    updateUserDetails
    // deleteUser
};
