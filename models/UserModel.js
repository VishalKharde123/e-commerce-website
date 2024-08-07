const { MongoNetworkError } = require('mongodb');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        fullname: {
            type: String, 
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String, 
            required: true
        },
        updatedAt: {
            type: Date
        }
    }
)

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;