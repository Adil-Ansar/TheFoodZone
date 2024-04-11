const { webListingModel } = require("../models/webListingModel");


const webList = async (req, res) => {
    try {
        const data = await webListingModel.find({}).exec();
        if (data) {
            return data
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

module.exports = {
    webList
};