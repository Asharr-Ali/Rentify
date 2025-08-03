import { useState } from "react";
import Joi from 'joi-browser';

const useCarForm = () => {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: 0,
        transmission: '',
        fuelType: '',
        seatingCapacity: 0,
        pricePerHour: 0,
        imageURL: '',
        location: '',
        description: ''
    });

    const [errors, setErrors] = useState({});

    const schema = {
        brand: Joi.string().min(3).max(50).required(),
        model: Joi.string().min(3).max(50).required(),
        year: Joi.number().positive().min(1886).required(),
        transmission: Joi.string().min(3).max(50).required(),
        seatingCapacity: Joi.number().positive().min(1).max(30).required(),
        pricePerHour: Joi.number().positive().required(),
        imageURL: Joi.string().min(1).required(),
        location: Joi.string().min(1).required()
    };

    return { formData, setFormData, errors, setErrors, schema };
};

export default useCarForm;
