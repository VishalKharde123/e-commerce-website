const express = require('express');
const UserModel = require('../models/UserModel');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

router.post('/', (req, res)=>{
    res.clearCookie("BlogApplication");
    const userName = req.userName;
    res.redirect('signin');
});


module.exports = router;