const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    phone: {
        type: Number,
    },
    address: {
        type: String
    },
    pinCode: {
        type: Number
    }
});

const AddressModel = mongoose.model("address", AddressSchema);

module.exports = AddressModel;