const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: Number,
        required: true
    }
})

const Customer = mongoose.model('Customer', customerSchema);


function validateCustomer(customer) {
    const customerSchema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.number().required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(customer, customerSchema);
};

module.exports.Customer = Customer;
module.exports.customerSchema = customerSchema;
module.exports.validateCustomer = validateCustomer;