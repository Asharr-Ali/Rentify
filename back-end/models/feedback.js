const Joi = require ('joi');
Joi.objectId = require('joi-objectid')(Joi);

function validate (req) {
    const schema = new Joi.object ({
        car_id: Joi.objectId().required(),
        rating: Joi.number().min(1).max(10).required(),
        review: Joi.string().min(5).max(50).required()
    });
    return schema.validate (req.body);
}

const mongoose = require ('mongoose');

const feedbackSchema = new mongoose.Schema ({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    car_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    review: {
        type: String, 
        minlength: 5, 
        maxlength: 50,
        required: true
    }
}, {
    timestamps: true
});

const Feedback = mongoose.model ('Feedback', feedbackSchema);

module.exports = { Feedback, 
                    validate };