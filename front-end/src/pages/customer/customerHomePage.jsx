import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router';

import CustomerNavbar from '../../components/customerNavbar';
import Footer from '../../components/footer';

import CustomerAuth from './customerAuth';

const apiEndPoint = 'http://localhost:4000/api';

const CustomerHomePage = () => {
    const Navigate = useNavigate();

    const user = CustomerAuth ();
    if (!user) return null;

    const [cars, setCars] = useState([]);

    useEffect (() => {
        async function getCars () {
            try {
                const { data: cars } = await axios.get (`${apiEndPoint}/car`);
                setCars (cars);
            }
            catch (err) {
                if (err.response && err.response === 404) setCars ([]);
                else toast.error ('Something went wrong. Try Again!');
            }
        }
        getCars();

    }, []);

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
                <CustomerNavbar user = {user} />
            </div>
            {
                cars.length ? (
                    <React.Fragment>
                        <div className='italic mt-28 text-4xl text-center font-extrabold'>Available Cars For Rental</div>
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
                                        <button onClick={() => Navigate("/customer/bidding-form", { state: { car } })} className='mt-5 hover:bg-gray-700 border rounded-2xl px-3 font-bold cursor-pointer'>Bid this Car</button>
                                    </div>
                                ))
                            }
                        </div>
                    </React.Fragment>
                ) :
                (
                    <div className='italic font-bold h-[400px] text-center mt-60 text-2xl text-gray-600'>
                        No Cars Available for Rental!
                    </div>
                )
            }
            <Footer />
        </>
    );
}
 
export default CustomerHomePage;