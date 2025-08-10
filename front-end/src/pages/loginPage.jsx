import React, { useState } from 'react';
import Joi  from 'joi-browser';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router';

import { renderInputField, renderOptionsField, validateFunction } from '../components/services/formFunctions';
import { decodeToken } from '../components/services/decodeToken';

import Navbar from '../components/navbar';
import Footer from '../components/footer';
import ScrollToTop from '../components/services/scrollToTop';

const apiEndPoint = 'https://rentify-qnpw.onrender.com/api/';

const LoginPage = () => {
    const Navigate = useNavigate ();

    const [formData, setFormData] = useState ({
        email: '',
        password: '',
        isAdmin: false
    });
    const [errors, setErrors] = useState ({});

    const schema = {
        password: Joi.string().min(3).required().label('Password'),
        email: Joi.string().email().required().label('Email'),
        isAdmin: Joi.boolean().required()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateFunction(formData, schema)) return;

        try {
            const { data: jwt } = await axios.post (`${apiEndPoint}customer/login`, formData);
            localStorage.setItem ('token', jwt);
            axios.defaults.headers.common['x-auth-token'] = jwt;
            toast.success ('User Logged In Successfully!');
            decodeToken().isAdmin ?  setTimeout (() => { Navigate ('/admin/home', { replace: true }) }, 3000) : setTimeout (() => { Navigate ('/customer/home', { replace: true }) }, 3000);
        }
        catch (err) {
            if (err.response && err.response.status === 400) toast.error ('Either Email or Password is Invalid!');
            else if (err.response && err.response.status === 404) toast.error ('No Such User Found!');
            else toast.error ('Something went wrong. Try Again!');
        }
    }

    return (
        <>
            <ScrollToTop />
            <Navbar />
            <form onSubmit={handleSubmit} className='h-[600px] grid place-items-center'>
                <div className='bg-black rounded-3xl px-2 py-5 md:px-20 md:py-10'>
                    <h1 className='text-white text-center text-3xl p-3 md:text-5xl md:p-5 font-extrabold md:font-bold'>Login</h1>

                    {renderInputField('Email', 'text', 'Email', formData.email, 'email', schema, errors, setErrors, formData, setFormData)}
                    {renderOptionsField(schema, setErrors, formData, setFormData)}
                    {renderInputField('Password', 'password', 'Password', formData.password, 'password', schema, errors, setErrors, formData, setFormData)}

                    <button disabled = {validateFunction(formData, schema)} className='text-white border rounded-2xl px-3 py-1 mt-5 ml-3 hover:bg-gray-900 cursor-pointer'>Log In</button>
                </div>
            </form>
            <Footer />
        </>
    );
}
 
export default LoginPage;