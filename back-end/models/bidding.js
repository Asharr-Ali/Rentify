const Joi = require ('joi');
Joi.objectId = require('joi-objectid')(Joi);

function validate (req) {
    const schema = new Joi.object ({
        car_id: Joi.objectId().required(),
        startTime: Joi.date().min('now').required(),
        endTime: Joi.date().greater(Joi.ref('startTime')).required(),
        biddingPrice: Joi.number().positive().required()
    });

    const { value, error } = schema.validate (req.body);
    if (error) return { error };

    const startTime = new Date (req.body.startTime);
    const endTime = new Date (req.body.endTime);

    if (endTime - startTime < 3600000)
        return { error: new Error ('End time must be equal or greater than 1 hour!')};

    return { value };
}

const mongoose = require ('mongoose');

const biddingSchema = new mongoose.Schema ({
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
    startTime: {
        type: Date, 
        required: true
    },
    endTime: {
        type: Date, 
        required: true
    },
    biddingPrice: {
        type: Number,
        min: 0,
        required: true
    },
    status: {
        type: String, 
        default: 'pending'
    }
}, {
    timestamps: true
});

const Bidding = mongoose.model ('Bidding', biddingSchema);

module.exports = { Bidding, 
                    validate };