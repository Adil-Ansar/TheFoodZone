const { userModel } = require("../models/userModel");

const { jwtToken, hashPassword, comparePasswords } = require("../../helper/comFun");


const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                meta: { msg: "Parameter missing.", status: false },
            });
        }

        const findUser = await userModel.findOne({
            email
        })
        if (findUser) {
            return res.status(409).json({
                meta: { msg: "User already exists. Please use a different email or username.", status: false },
            });
        }

        const hashpassword = await hashPassword(password);
        const userObj = {
            name,
            email,
            password: hashpassword
        }

        const userdata = await userModel.create(userObj);
        if (userdata) {
            return res.status(201).json({
                meta: { msg: "User created.", status: true },
                data: userdata
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

        const userdata = await userModel.findOne({
            email
        })

        if (userdata) {
            const isCorrectPassword = await comparePasswords(password, userdata.password)
            if (!isCorrectPassword) {
                return res.status(200).json({
                    meta: { msg: "Invalid email or password. Please check your credentials and try again.", status: false }
                });
            }
            const token = await jwtToken({
                userId: userdata.userId,
                name: userdata.name,
                email: userdata.email
            });
            return res.status(200).json({
                meta: { msg: "User signIn successfully.", status: true },
                data: userdata,
                token
            });
        } else {
            return res.status(400).json({
                meta: { msg: "User not found", status: false },
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
        const { userId } = req.decoded;

        if (!userId) {
            return res.status(400).json({
                meta: { msg: "Parameter missing.", status: false },
            });
        }
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

const updateUserDetails = async (req, res) => {
    try {
        const { userId } = req.decoded;
        const { name, email } = req.body;

        if (!userId) {
            return res.status(400).json({
                meta: { msg: "Parameter missing.", status: false },
            });
        }

        const findUser = await userModel.findOne({ userId });
        if (!findUser) {
            return res.status(400).json({
                meta: { msg: "User not found", status: false },
            });
        };

        const updateObj = {
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

const deleteAccount = async (req, res) => {
    try {
        const { userId } = req.decoded;
        const findUser = await userModel.findOne({ userId });
        if (!findUser) {
            return res.status(400).json({
                meta: { msg: "User not found", status: false },
            });
        };

        const deleteUser = await userModel.findOneAndDelete({ userId });
        if (deleteUser) {
            return res.status(200).json({
                meta: { msg: "User has been deleted successfully.", status: true },
                data: deleteUser
            });
        } else {
            return res.status(400).json({
                meta: { msg: "Unable to delete the user at this time.", status: false },
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
    getUserDetails,
    updateUserDetails,
    deleteAccount
};
