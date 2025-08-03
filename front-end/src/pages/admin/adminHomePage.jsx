import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

import AdminNavbar from '../../components/adminNavbar';
import Footer from '../../components/footer';

import AdminAuth from './adminAuth';

const apiEndPoint = 'http://localhost:4000/api';

const AdminHomePage = () => {
    const Navigate = useNavigate ();

    const user = AdminAuth ();
    if (!user) return null;

    const [cars, setCars] = useState([]);

    useEffect (() => {
        async function getCars () {
            try {
                const { data: cars } = await axios.get (`${apiEndPoint}/car/admin-cars`);
                setCars (cars);
            }
            catch (err) {
                if (err.response && err.response.status === 404) setCars ([]);
                else toast.error ('Something went wrong. Try Again!');
            }
        }
        getCars();

    }, []);

    const handleRemoveCar = async (CarID) => {
        const totalCars = [...cars];
        const filteredCars = cars.filter (car => car._id !== CarID);
        setCars (filteredCars);

        const body = { _id: CarID };

        try {
            await axios.delete (`${apiEndPoint}/car`, {
                data: body
            });
            await axios.delete (`${apiEndPoint}/bidding`, {
                data: { car_id: CarID }
            })
            await axios.delete (`${apiEndPoint}/booking/removeAll`, {
                data: { car_id: CarID }
            })
            toast.success ('Car Deleted Successfully!');
        }
        catch (err) {
            console.log (err)
            if (err.response && err.reponse.status === 404) toast.error (err.response.data);
            else toast.error ('Something went wrong. Try Again!');
            setCars (totalCars);
        }
    }

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
                <AdminNavbar user = {user} />
            </div>
            {
                cars.length ? (
                    <React.Fragment>
                        <div className='italic mt-28 text-4xl text-center font-extrabold'>Your Added Cars For Rental</div>
                        <div className='m-10 md:m-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10'>
                            {
                                cars.map (car => (
                                    <div key={car._id} className='p-4 lg:p-10 border bg-black text-white rounded-xl transition-transform duration-300 ease-in-out hover:scale-105'>
                                        <div>
                                            {<img className='w-full' src = {car.imageURL} alt = "No Image Found"></img>}
                                        </div>
                                        <div className='mt-10 font-extrabold text-2xl md:text-3xl'>
                                            {car.brand} {car.model} ({car.year})
                                        </div>
                                        <div className='mt-5 font-bold text-xl'>
                                            {car.transmission} | {car.fuelType}
                                        </div>
                                        <div className='text-xl'>
                                            {car.seatingCapacity} Seats
                                        </div>
                                        <div className='italic animate-pulse'>
                                            {car.location}
                                        </div>
                                        <div className='mt-5 mb-5 md:text-xl text-justify italic font-sans'>
                                            {car.description.slice(0, 100)}
                                        </div>
                                        <div className='text-xl italic font-bold animate-bounce'>
                                            {car.pricePerHour} $/hour
                                        </div>
                                        <div className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-4'>
                                            <button onClick={() => Navigate ('/admin/update-car', { state: { car } })} className='border px-0.5 md:px-2 py-1 rounded-2xl cursor-pointer hover:bg-gray-900'>
                                                Update Car  
                                            </button>
                                            <button onClick={() => handleRemoveCar(car._id)} className='border px-2 py-1 rounded-2xl cursor-pointer hover:bg-gray-900'>
                                                Remove Car
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </React.Fragment>
                ) :
                (
                    <div className='italic font-bold h-[400px] text-center mt-60 text-2xl text-gray-600'>
                        No Cars Added for Rental!
                    </div>
                )
            }
            <Footer />
        </>
    );
}
 
export default AdminHomePage;