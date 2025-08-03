const Joi = require ('joi');
Joi.objectId = require('joi-objectid')(Joi);

function validate (req) {
    const schema = new Joi.object ({
        bidding_id: Joi.objectId().required(),
        admin_id: Joi.objectId().required(),
        customer_id: Joi.objectId().required(),
        car_id: Joi.objectId().required(),
        bookingDateStartTime: Joi.date().required(),
        bookingDateEndTime: Joi.date().required()
    });
    return schema.validate (req.body);
}

const mongoose = require ('mongoose');

const bookingSchema = new mongoose.Schema ({
    bidding_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bidding',
        required: true
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
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
    bookingDateStartTime: {
        type: Date,
        required: true        
    },
    bookingDateEndTime: {
        type: Date,
        required: true        
    }
});

const Booking = mongoose.model ('Booking', bookingSchema);

module.exports = { Booking, 
                    validate };