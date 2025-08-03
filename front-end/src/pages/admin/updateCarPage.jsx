import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router';

import AdminAuth from './adminAuth';

import useCarForm from '../../components/services/useCarInfo';
import CarPageUI from '../../components/services/carPageUI';

const apiEndPoint = 'http://localhost:4000/api';

const UpdateCar = () => {
    const Location = useLocation();
    const car = Location.state?.car;

    const Navigate = useNavigate();

    const user = AdminAuth ();
    if (!user) return null;

    useEffect (() => {
        const { addedBy, createdAt, updatedAt, _id, __v, ...CarData } = car;
        setFormData (CarData);
    }, []);

    const { formData, setFormData, errors, setErrors, schema } = useCarForm();

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData._id = car._id;

        try {
            await axios.put(`${apiEndPoint}/car`, formData);
            toast.success('Car Updated Successfully!');
            setTimeout(() => {
                Navigate('/admin/home');
            }, 3000);
        } catch (err) {
            if (err.response && err.response.status === 404) toast.error('No Car Found!');
            else if (err.response && err.response.data) toast.error(err.response.data);
            else toast.error('Something went wrong. Try Again!');
        }
    }

    return ( 
            <CarPageUI
                label="Update Car Page"
                button="Update Car"
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
                schema={schema}
                handleSubmit={handleSubmit}
            />
    );
}
 
export default UpdateCar;