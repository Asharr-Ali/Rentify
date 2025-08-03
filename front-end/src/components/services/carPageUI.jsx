import ScrollToTop from "./scrollToTop";
import { decodeToken } from "./decodeToken";
import { handleChange, renderInputField, validateFunction } from "./formFunctions";

import AdminNavbar from "../adminNavbar";
import Footer from "../footer";

const CarPageUI = ({ label, button, formData, setFormData, errors, setErrors, schema, handleSubmit }) => {
    return (
        <>
            <ScrollToTop />
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
                <AdminNavbar user = {decodeToken()} />
            </div>
            <form onSubmit={handleSubmit} className='h-[1100px] mt-28 grid place-items-center'>
                <div className='bg-black rounded-3xl px-2 py-5 md:px-20 md:py-10'>
                    <h1 className='text-white text-center text-3xl p-3 md:text-5xl md:p-5 font-extrabold md:font-bold'>{label}</h1>

                    {renderInputField('Brand', 'text', 'Brand', formData.brand, 'brand', schema, errors, setErrors, formData, setFormData)}
                    {renderInputField('Model', 'text', 'Model', formData.model, 'model', schema, errors, setErrors, formData, setFormData)}
                    {renderInputField('Year', 'number', 'Year', formData.year, 'year', schema, errors, setErrors, formData, setFormData)}
                    {renderInputField('Transmission', 'text', 'Transmission', formData.transmission, 'transmission', schema, errors, setErrors, formData, setFormData)}

                    <h2 className='text-white text-2xl'>Select Fuel Type</h2>
                    <select name='fuelType' onChange={e => handleChange(e, schema, setErrors, formData, setFormData)} className='text-white w-full px-2 py-1 ml-3 mt-3 focus:outline-none focus:border-amber-100 border border-white rounded-2xl'>
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

                    <button disabled={validateFunction(formData, schema)} className='text-white border rounded-2xl px-3 py-1 mt-5 ml-3 hover:bg-gray-900 cursor-pointer'>{button}</button>
                </div>
            </form>
            <Footer />
        </>
    );
};

export default CarPageUI;
