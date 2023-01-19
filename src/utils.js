const jwt = require("jsonwebtoken")
require('dotenv').config()

const utils = {
    checkLogin: async (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error('Authorization header is required');
        }
        jwt.verify(token, process.env.JWT_SECRET, function (err, auth) {
            if (err) {
                throw new Error("Unauthorized")
            } else {
                req.auth = auth
                next()
            }
        })
    }
}

module.exports = utils;