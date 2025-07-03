const Joi = require ('joi');

function validate (req) {
    const schema = new Joi.object ({
        brand: Joi.string().min(3).max(50).required(),
        model: Joi.string().min(3).max(50).required(),
        year: Joi.number().positive().required(),
        transmission: Joi.string().min(3).max(50).required(),
        seatingCapacity: Joi.number().positive().required(),
        pricePerHour: Joi.number().positive().required(),
        imageURL: Joi.string().min(1).required()
    });
    return schema.validate (req.body);
}

function validateUpdate (req) {
    const schema = new Joi.object ({
        brand: Joi.string().min(3).max(50),
        model: Joi.string().min(3).max(50),
        year: Joi.number().positive(),
        transmission: Joi.string().min(3).max(50),
        seatingCapacity: Joi.number().positive(),
        pricePerHour: Joi.number().positive(),
        imageURL: Joi.string().min(1)
    }).min(1);
    return schema.validate (req.body);
}

const mongoose = require ('mongoose');

const carSchema = new mongoose.Schema ({
    brand: {
        type: String, 
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        min: 1886,
        max: new Date().getFullYear(),
        required: true
    },
    transmission: {
        type: String, 
        required: true
    },
    fuelType: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
        required: true
    },
    seatingCapacity: {
        type: Number,
        min: 1,
        max: 30,
        default: 5
    },
    imageURL: {
        type: String,
        required: true
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    location: {
        type: String, 
        default: 'Lahore, Punjab, Pakistan'
    },
    description: {
        type: String,
        default: 'Experience comfort, performance, and reliability with this well-maintained vehicle — perfect for city drives and long journeys. Featuring a modern design, fuel-efficient engine, spacious interior, and advanced safety features, this car ensures a smooth and enjoyable ride every time.'
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    }
}, {
    timestamps: true
});

const Car = mongoose.model ('Car', carSchema);

module.exports = { Car, 
                    validate,
                    validateUpdate };