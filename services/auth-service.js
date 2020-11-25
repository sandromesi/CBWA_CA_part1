'use strict'
require('dotenv').config()
const jwt = require("jsonwebtoken")
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

exports.generateToken = async (user) => {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, ACCESS_TOKEN_SECRET);
    return data;
}

exports.autorize = function (req, res, next) {
    var token = req.body.token || req.query.body || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Access denied!'
        });
    } else {
        jwt.verify(token, ACCESS_TOKEN_SECRET, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Invalid Token!'
                });
            } else {
                next();
            }
        })
    }
};