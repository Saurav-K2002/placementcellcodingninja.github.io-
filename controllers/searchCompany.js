const Company = require("../models/companyModel");

const searchCompany = (req, res) => {
    try {
        Company.find(req.query).exec((err, result) => {
            if (err) {
                return res.status(401).json(err)
            }
            else if (JSON.stringify(result) == "[]") {
                return res.status(301).json({
                    message: "No Company Found",
                })
            }
            const filteredArr = result.map((company) => {
                const { hashPassword, ...others } = company._doc
                return others
            })
            return res.status(202).json({
                filteredArr
            })
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = searchCompany
