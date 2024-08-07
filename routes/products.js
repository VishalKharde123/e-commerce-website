const express = require('express');
const router = express.Router();
const BlogModel = require('../models/BlogModel');
const limit = 3;
var offset = 1;

router.get('/', async (req, res) => {
    const userName = req.userName;
    try {
        var allProducts;
        var totalPages = 0;
        const estimatedCount = await BlogModel.estimatedDocumentCount();
        totalPages = Math.ceil(estimatedCount / 3);

        if (req.query.page) {
            const page = req.query.page - 1;

            allProducts = await BlogModel.find()
                .limit(limit)
                .skip(limit * page)
        }
        else {
            allProducts = await BlogModel.find()
                .limit(limit)
        }
        res.render('products', { allProducts, totalPages, userName });
    }
    catch (e) {
        return res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
});

router.post('/search', async (req, res) => {
    const userName = req.userName;
    
    try {
        const Products = await BlogModel.find({
            title: { $regex: req.body.search, $options: 'i' }
        });

        var allProducts = [];

        if (req.body.search) {
            const page = req.body.search - 1;
            p = await BlogModel.find({
                title: { $regex: req.body.search, $options: 'i' }
            })
                .limit(limit)
                .skip(limit * page)
            allProducts = p;
        }
        else {
            const p = await BlogModel.find({
                title: { $regex: req.body.search, $options: 'i' }
            })
            .limit(limit);
            allProducts = p;
        }

            const totalPages = Math.ceil(Products.length / 3);
            
            res.render('products', { allProducts, totalPages, userName });
        }
    catch (e) {
            return res.status(500).json({
                status: "failed",
                message: e.message
            })
        }
    });

module.exports = router;