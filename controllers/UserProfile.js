const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

async function getUserProfile(req, res, next) {
    if (!req.cookies.BlogApplication) {
        req.payload = 0;
        req.userName = 'No';
        next();
    }
    else {
        await jwt.verify(req.cookies.BlogApplication, process.env.SECRET_KEY, function (err, payload) {
            if (err) {
                console.log('Signature Tampered');
                return res.status(400).send('Invalid token.... Login again');
            }
            req.payload = payload;
        });
        const User = await UserModel.findById(req.payload);
        req.userName = User.fullname;
        next();
    }
}

module.exports = getUserProfile;