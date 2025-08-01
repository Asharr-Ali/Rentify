import React, { useState } from 'react';
import Joi from 'joi-browser'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router';

import { decodeToken } from '../../components/services/decodeToken';
import ScrollToTop from '../../components/services/scrollToTop';
import { renderInputField } from '../../components/services/formFunctions';
import AdminAuth from './adminAuth';
import { validateFunction } from '../../components/services/formFunctions';
import { handleChange } from '../../components/services/formFunctions';

import AdminNavbar from '../../components/adminNavbar';
import Footer from '../../components/footer';

const apiEndPoint = 'http://localhost:4000/api';

const RegisterCar = () => {
    const Navigate = useNavigate();

    const user = AdminAuth ();
    if (!user) return null;

    const [formData, setFormData] = useState ({
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
    const [errors, setErrors] = useState ({});

    const schema = {
        brand: Joi.string().min(3).max(50).required(),
        model: Joi.string().min(3).max(50).required(),
        year: Joi.number().positive().min(1886).required(),
        transmission: Joi.string().min(3).max(50).required(),
        seatingCapacity: Joi.number().positive().min(1).max(30).required(),
        pricePerHour: Joi.number().positive().required(),
        imageURL: Joi.string().min(1).required(),   
        location: Joi.string().min(1).required()   
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post(`${apiEndPoint}/car`, formData);
            toast.success ('Car Added Successfully!');
            setTimeout(() => {
                Navigate ('/admin/home');
            }, 3000);
        }
        catch (err) {
            if (err.response && err.response === 400) toast.error ('Car Already Added!');
            else if (err.response && err.response.data) toast.error (err.response.data);
            else toast.error ('Something went wrong. Try Again!');
        }
    }

    return ( 
        <>
            <ScrollToTop />
            <AdminNavbar user = {decodeToken()} />
            <form onSubmit={handleSubmit} className='h-[1100px] grid place-items-center'>
                <div className='bg-black rounded-3xl px-2 py-5 md:px-20 md:py-10'>
                    <h1 className='text-white text-center text-3xl p-3 md:text-5xl md:p-5 font-extrabold md:font-bold'>Register Car</h1>

                    {renderInputField('Brand', 'text', 'Brand', formData.brand, 'brand', schema, errors, setErrors, formData, setFormData)}
                    {renderInputField('Model', 'text', 'Model', formData.model, 'model', schema, errors, setErrors, formData, setFormData)}
                    {renderInputField('Year', 'number', 'Year', formData.year, 'year', schema, errors, setErrors, formData, setFormData)}
                    {renderInputField('Transmission', 'text', 'Transmission', formData.transmission, 'transmission', schema, errors, setErrors, formData, setFormData)}

                    <h2 className='text-white text-2xl'>Select Fuel Type</h2>
                    <select name='fuelType' onChange={e => handleChange (e, schema, setErrors, formData, setFormData)} className='text-white border border-white m-2 w-full rounded-2xl px-3 py-1 focus:outline-none focus:border-amber-100'>
                        <option value='Petrol' className='bg-black text-white'>Petrol</option>
                        <option value='Diesel' className='bg-black text-white'>Diesel</option>
                        <option value='Electric' className='bg-black text-white'>Electric</option>
                        <option value='Hybrid' className='bg-black text-white'>Hybrid</option>
                    </select>

                    {renderInputField('Seating Capacity', 'number', 'Seating Capacity', formData.seatingCapacity, 'seatingCapacity', schema, errors, setErrors, formData, setFormData)}
                    {renderInputField('Price Per Hour', 'number', 'In USD', formData.pricePerHour, 'pricePerHour', schema, errors, setErrors, formData, setFormData)}
                    {renderInputField('Image URL', 'text', 'Paste Image URL only', formData.imageURL, 'imageURL', schema, errors, setErrors, formData, setFormData)}
                    {renderInputField('Location', 'text', 'Vehicle Current Location', formData.location, 'location', schema, errors, setErrors, formData, setFormData)}
                    {renderInputField('Description', 'text', 'Optional', formData.description, 'description', schema, errors, setErrors, formData, setFormData)}

                    <button disabled = {validateFunction(formData, schema)} className='text-white border rounded-2xl px-3 py-1 mt-5 ml-3 hover:bg-gray-900 cursor-pointer'>Register Car</button>
                </div>
            </form>
            <Footer />
        </>
    );
}
 
export default RegisterCar;