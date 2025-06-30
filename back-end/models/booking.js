const Joi = require ('joi');
Joi.objectId = require('joi-objectid')(Joi);

function validate (req) {
    const schema = new Joi.object ({
        car_id: Joi.objectId().required(),
        bookingDate: Joi.date().required()
    });
    return schema.validate (req.body);
}

const mongoose = require ('mongoose');

const bookingSchema = new mongoose.Schema ({
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
    bookingDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > Date.now();
            }
        },
        required: true        
    }
});

const Booking = mongoose.model ('Booking', bookingSchema);

module.exports = { Booking, 
                    validate };