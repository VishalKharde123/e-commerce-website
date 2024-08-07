const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const path = require('path');
const upload = require('../controllers/multerUploading');

router.get('/', (req, res) => {
    res.render('signup');
});

router.post('/submit_sign_up', async (req, res) => {
    try {
        var hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        await UserModel.create({
            fullname: req.body.fullname,
            email: req.body.email,
            password: hashedPassword,
            updatedAt: new Date()
        });
        res.render("tempRedirect");
    }
    catch(e){
        return res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
});

module.exports = router;