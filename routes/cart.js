const express = require('express');
const UserModel = require('../models/UserModel');
const router = express.Router();
const sessionMiddleware = require('../controllers/sessionManage');
const CartModel = require('../models/CartModel');
const BlogModel = require('../models/BlogModel');
const AddressModel = require('../models/AddressModel');

router.get('/', sessionMiddleware, async(req, res)=>{
    var allProducts = [];
    var totalPrice = 0;
    var discount = 0;
    const userName = req.userName;
    var totalAmount = 0;

    try{
        const userId = req.payload;
        const cartAllData = await CartModel.find({userId: userId, paymentStatus: false});
        
        const promises = cartAllData.map(async (cart) => {
            const products = await BlogModel.find({ productId: cart.productId });
            allProducts.push(...products);
        });
        
        await Promise.all(promises);
        allProducts.forEach((product)=>{
            totalPrice = totalPrice + product.markedPrice;
            discount = discount + (product.markedPrice - product.discountPrice);
            totalAmount = totalAmount + product.discountPrice;
        });
    }
    catch(e)
    {
        return res.render('cart', {allProducts, totalPrice, discount, totalAmount, userName});
    }
    res.status(200).render('cart', {allProducts, totalPrice, discount, totalAmount, userName});
});

router.post('/AddToCart', sessionMiddleware, async (req, res)=>{
    try{
        CartModel.create({
            userId: req.payload,
            productId: req.body.productId,
            paymentStatus: false,
            timestamp: new Date()
        })
    }
    catch(e)
    {
        return res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
    res.status(200).redirect('/categories');
});

router.post('/deleteFromCart', sessionMiddleware, async (req, res)=>{
    try
    {
        await CartModel.deleteOne({productId: req.body.productId});
    }
    catch(e)
    {
        return res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
    res.status(200).redirect('/cart');
});

router.post('/place-order',async (req, res)=>{
    const userName = req.userName;
    const addressData = await AddressModel.find({userId: req.payload});
    
    res.status(200).render('placeOrder', {userName, addressData});
})

router.post('/save-address',async (req, res)=>{
    const userName = req.userName;
    
    await AddressModel.create({
        userId: req.payload,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        pinCode: req.body.zipcode
    })

    const addressData = await AddressModel.find({userId: req.payload});
    
    res.status(200).render('placeOrder', {userName, addressData});
})

module.exports = router;