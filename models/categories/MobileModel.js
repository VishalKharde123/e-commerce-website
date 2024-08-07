
const mongoose = require('mongoose');

const MobileSchema = new mongoose.Schema({
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

const BlogModel = mongoose.model("Mobiles", MobileSchema);

module.exports = BlogModel;