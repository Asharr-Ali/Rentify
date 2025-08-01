const config = require ('config');
const jwt = require ('jsonwebtoken');
const mongoose = require ('mongoose');
const Joi = require ('joi');

function validate (req) {
    const schema = new Joi.object ({
        name: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(13).required(),
        isAdmin: Joi.boolean().required()
    });

    return schema.validate(req.body);
}

const customerSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        minlength: 13
    },
    isAdmin: {
        type: Boolean, 
        required: true
    }
});

customerSchema.methods.generateAuthToken = function () {
    return jwt.sign ({ _id: this._id, name: this.name, email: this.email, isAdmin: this.isAdmin }, config.get ('JWT_PRIVATE_KEY'));
}

const Customer = mongoose.model ('Customer', customerSchema);

module.exports = { Customer, 
                    validate };