const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const GroceryModel = require('../models/categories/GroceryModel');
const MobileModel = require('../models/categories/MobileModel');
const FashionModel = require('../models/categories/FashionModel');
const FurnitureModel = require('../models/categories/FurnitureModel');

router.get('/', async (req, res) => {
    const userName = req.userName;
    res.status(200).render('categories', {userName});
});

router.get('/grocery', async (req, res) => {
    const userName = req.userName;
    try {
        const groceryData = await GroceryModel.find({});
        const userId = req.cookies.BlogApplication;
        res.status(200).render('grocery', {groceryData, userId, userName});
    }
    catch (e) {
        return res.status(500).send({
            status: "Failed",
            message: e
        })
    }
});

router.get('/mobiles', async (req, res) => {
    const userName = req.userName;
    try {
        const mobilesData = await MobileModel.find({});
        const userId = req.cookies.BlogApplication;
        res.status(200).render('mobiles', {mobilesData, userId, userName});
    }
    catch (e) {
        return res.status(500).send({
            status: "Failed",
            message: e
        })
    }
});

router.get('/fashion', async (req, res) => {
    const userName = req.userName;
    try {
        const fashionData = await FashionModel.find({});
        const userId = req.cookies.BlogApplication;
        res.status(200).render('fashion', {fashionData, userId, userName});
    }
    catch (e) {
        return res.status(500).send({
            status: "Failed",
            message: e
        })
    }
});

router.get('/furnitures', async (req, res) => {
    const userName = req.userName;
    try {
        const furnitureData = await FurnitureModel.find({});
        const userId = req.cookies.BlogApplication;
        res.status(200).render('furnitures', {furnitureData, userId, userName});
    }
    catch (e) {
        return res.status(500).send({
            status: "Failed",
            message: e
        })
    }
});

module.exports = router;