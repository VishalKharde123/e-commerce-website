const mongoose = require('mongoose');

const GlocerySchema = new mongoose.Schema({
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
    }
});

const BlogModel = mongoose.model("GloceryProducts", GlocerySchema);

module.exports = BlogModel;