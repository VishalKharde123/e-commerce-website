const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    markedPrice: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    },
    imgBuffer: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date
    },
    category: {
        type: String
    },
    productId: {
        type: String
    }
});

const BlogModel = mongoose.model("blogs", BlogSchema);

module.exports = BlogModel;