const express = require('express')
const GroceryModel = require('../models/categories/GroceryModel');
const MobileModel = require('../models/categories/MobileModel');
const FashionModel = require('../models/categories/FashionModel');
const FurnitureModel = require('../models/categories/FurnitureModel');
const router = express.Router();
const upload = require('../controllers/uploadBlog');
const BlogModel = require('../models/BlogModel');
const sessionMiddleware = require('../controllers/sessionManage');

router.get('/', sessionMiddleware, (req, res) => {
    const userName = req.userName;
    return res.status(200).render('blogPage', { userName });
});

router.post('/add', upload.single('blogImg'), async (req, res, next) => {

    data = {
        bufferImg: req.file.buffer.toString('base64'),
        contentType: req.file.mimetype
    }
    src = `data:${data.contentType};base64,${data.bufferImg.toString('base64')}`;

    var newproductId;
    var newProduct;

    if (req.body.category == "grocery") {
        newProduct = await GroceryModel.create({
            title: req.body.title,
            markedPrice: req.body.markedPrice,
            discountPrice: req.body.discountPrice,
            category: req.body.category,
            imgBuffer: src,
            timeStamp: new Date()
        }
        );
    }
    else if (req.body.category == "mobiles") {
        newProduct = await MobileModel.create({
            title: req.body.title,
            markedPrice: req.body.markedPrice,
            discountPrice: req.body.discountPrice,
            category: req.body.category,
            imgBuffer: src,
            timeStamp: new Date()
        }
        );
    }
    else if (req.body.category == "fashion") {
        newProduct = await FashionModel.create({
            title: req.body.title,
            markedPrice: req.body.markedPrice,
            discountPrice: req.body.discountPrice,
            category: req.body.category,
            imgBuffer: src,
            timeStamp: new Date()
        }
        );
    } else if (req.body.category == "furniture") {
        newProduct = await FurnitureModel.create({
            title: req.body.title,
            markedPrice: req.body.markedPrice,
            discountPrice: req.body.discountPrice,
            category: req.body.category,
            imgBuffer: src,
            timeStamp: new Date()
        }
        );
    }
    
    newproductId = newProduct._id;

    await BlogModel.create({
        title: req.body.title,
        markedPrice: req.body.markedPrice,
        discountPrice: req.body.discountPrice,
        category: req.body.category,
        imgBuffer: src,
        productId: newproductId,
        timeStamp: new Date()
    });

    return res.redirect('/');
});

module.exports = router;