import React, { useState } from 'react';
import Joi  from 'joi-browser';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

import { renderInputField, renderOptionsField, validateFunction } from '../components/services/formFunctions';
import { decodeToken } from '../components/services/decodeToken';

import Navbar from '../components/navbar';
import Footer from '../components/footer';
import ScrollToTop from '../components/services/scrollToTop';

const apiEndPoint = 'http://localhost:4000/api/';

const SignupPage = () => {
    const Navigate = useNavigate();

    const [formData, setFormData] = useState ({
        name: '',
        password: '',
        email: '',
        phone: '',
        isAdmin: false
    });
    const [errors, setErrors] = useState ({});

    const schema = {
        name: Joi.string().min(3).max(50).required().label('UserName'),
        password: Joi.string().min(3).required().label('Password'),
        email: Joi.string().email().required().label('Email'),
        phone: Joi.string().regex(/^\+923\d{9}$/).required().label('Phone Number'),
        isAdmin: Joi.boolean().required()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateFunction(formData, schema)) return;

        try {
            const { headers } = await axios.post (`${apiEndPoint}customer`, formData);
            localStorage.setItem ('token', headers['x-auth-token']);
            toast.success ('User Registered Successfully!');
            decodeToken().isAdmin ?  setTimeout (() => { Navigate ('/admin/home', { replace: true }) }, 3000) : setTimeout (() => { Navigate ('/customer/home', { replace: true }) }, 3000);
        }
        catch (err) {
            if (err.response && err.response.status === 400) toast.error ('User Already Registered with this Email!');
            else toast.error ('Something went wrong. Try Again!');
        }
    }

    return (
        <>
            <ScrollToTop />
            <Navbar />
            <form onSubmit={handleSubmit} className='h-[800px] grid place-items-center'>
                <div className='bg-black rounded-3xl px-2 py-5 md:px-20 md:py-10'>
                    <h1 className='text-white text-3xl p-3 md:text-5xl md:p-5 font-extrabold md:font-bold text-center'>Sign up</h1>

                    {renderInputField('UserName', 'text', 'UserName', formData.name, 'name', schema, errors, setErrors, formData, setFormData)}
                    {renderInputField('Email', 'text', 'Email', formData.email, 'email', schema, errors, setErrors, formData, setFormData)}
                    {renderOptionsField(schema, setErrors, formData, setFormData)}
                    {renderInputField('Phone', 'text', '+923*********', formData.phone, 'phone', schema, errors, setErrors, formData, setFormData)}
                    {renderInputField('Password', 'password', 'Password', formData.password, 'password', schema, errors, setErrors, formData, setFormData)}

                    <button disabled = {validateFunction(formData, schema)} className='text-white border rounded-2xl px-3 py-1 mt-5 ml-3 hover:bg-gray-900 cursor-pointer'>Sign Up</button>
                </div>
            </form>
            <Footer />
        </>
    );
}
 
export default SignupPage;