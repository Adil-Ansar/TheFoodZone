const { webListingModel } = require("../models/webListingModel");


const webList = async (req, res) => {
    try {
        const data = await webListingModel.findOne({}).exec();
        if (data) {
            return res.status(200).json({
                data
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

module.exports = {
    webList
};