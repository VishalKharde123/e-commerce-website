const express = require('express');
const UserModel = require('../models/UserModel');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

router.get('/', (req, res)=>{
    const userName = req.userName;
    res.render('signin', {userName});
});

router.post('/sign_in_submit',async (req, res)=>{
    //console.log(req.body);

    if (typeof req.body.email !== 'string') {
        return res.status(400).send('Invalid email format');
    }
    const foundRecord = await UserModel.findOne({'email': req.body.email});

    if(!foundRecord)
    {
        return res.send('User not exists');
    }
    else
    {
        var result = await bcrypt.compare(req.body.password, foundRecord.password);
        if(result)
        {
            const originalId = foundRecord._id.toHexString();
            const token = await jwt.sign(originalId, process.env.SECRET_KEY);
            res.cookie('BlogApplication', token, {maxAge: 60 * 10 * 1000});
            return res.redirect('/');
        }
        else
        {
            return res.send('Invalid password');
        }
    }

    //return res.send('OK');
});

module.exports = router;