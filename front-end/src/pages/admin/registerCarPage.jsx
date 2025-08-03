import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router';

import AdminAuth from './adminAuth';
import useCarForm from '../../components/services/useCarInfo';
import CarPageUI from '../../components/services/carPageUI';

const apiEndPoint = 'http://localhost:4000/api';

const RegisterCar = () => {
    const navigate = useNavigate();
    const user = AdminAuth();
    if (!user) return null;

    const { formData, setFormData, errors, setErrors, schema } = useCarForm();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${apiEndPoint}/car`, formData);
            toast.success('Car Added Successfully!');
            setTimeout(() => {
                navigate('/admin/home');
            }, 3000);
        } catch (err) {
            if (err.response && err.response.status === 400) toast.error('Car Already Added!');
            else if (err.response && err.response.data) toast.error(err.response.data);
            else toast.error('Something went wrong. Try Again!');
        }
    };

    return (
        <CarPageUI
            label="Register Car Page"
            button="Register Car"
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            schema={schema}
            handleSubmit={handleSubmit}
        />
    );
};

export default RegisterCar;