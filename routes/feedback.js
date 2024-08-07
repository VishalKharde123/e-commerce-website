const express = require('express');
const BlogModel = require('../models/BlogModel');
const router = express.Router();
const FeedbackModel = require('../models/FeedbackModel');
const sessionManage = require('../controllers/sessionManage');
const CartModel = require('../models/CartModel');

router.post('/', async (req, res) => {
    const userName = req.userName;
    const data = await BlogModel.find({ productId: req.body.productId });
    const allProducts = data;
    const feedbackData = await FeedbackModel.find({ productId: req.body.productId });
    res.status(200).render('feedback', { userName, allProducts, feedbackData });
});

router.post('/add', sessionManage, async (req, res) => {
    const userName = req.userName;

    const data = await BlogModel.find({ productId: req.body.productId });
    const allProducts = data;

    const isPurchased = await CartModel.find({ userId: req.payload, productId: req.body.productId });
    
    if (isPurchased.length == 0)
    {
        return res.send(`Sorry! You are not allowed to review this product since you haven't bought it on VMart.`);
    }
    else
    {
        res.status(200).render('addFeedback', { userName, allProducts });
    }
})

router.post('/submit', async (req, res) => {
    const userName = req.userName;

    const data = await BlogModel.find({ productId: req.body.productId });
    const allProducts = data;

    await FeedbackModel.create({
            userId: req.payload,
            productId: req.body.productId,
            starCount: req.body.rating,
            message: req.body.message
        })

    const feedbackData = await FeedbackModel.find({ productId: req.body.productId });

    res.status(200).render('feedback', { userName, allProducts, feedbackData });
})

module.exports = router;