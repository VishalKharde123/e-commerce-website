const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    productId: {
        type: String
    },
    starCount: {
        type: Number
    },
    review: {
        type: String
    },
    message: {
        type: String
    }
});

const FeedbackModel = mongoose.model("Feedback", FeedbackSchema);

module.exports = FeedbackModel;