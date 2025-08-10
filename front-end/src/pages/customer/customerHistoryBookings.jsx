import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import CustomerNavbar from "../../components/customerNavbar";
import Footer from "../../components/footer";

import { decodeToken } from "../../components/services/decodeToken";
import CustomerAuth from "./customerAuth";
import ScrollToTop from '../../components/services/scrollToTop'

const apiEndPoint = 'https://rentify-qnpw.onrender.com/api';

const CustomerHistoryBookingPage = () => {
    const user = CustomerAuth ();
    if (!user) return null;
    
    const [bookings, setBookings] = useState ([]);

    useEffect (() => {
        async function getBookings () {
            try {
                const { data: bookings } = await axios.get (`${apiEndPoint}/booking/history`);
                console.log (bookings)
                setBookings (bookings); 
            }
            catch (err) {
                if (err.response?.status === 404) setBookings ([]);
                else if (err.response?.status === 400) toast.error (err.response.data);
                else toast.error ('Something went Failed. Try Again!');
            }
        }
        getBookings ();

    }, []);

    const formatDateTime = (dateTime) => {
        return new Date (dateTime).toLocaleString ('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'  
        })
    }

    return (
        <>
            <ScrollToTop />
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
                <CustomerNavbar user = {decodeToken()} />
            </div>
            {
                bookings.length ? (
                    <React.Fragment>
                        <div className='italic mt-28 text-4xl text-center font-extrabold'>Upcoming Bookings</div>
                        <div className='m-10 md:m-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10'>
                            {
                                bookings.map (booking => (
                                    <div key={booking._id} className='p-4 lg:p-10 border bg-black text-white rounded-xl transition-transform duration-300 ease-in-out hover:scale-105'>
                                        <div>
                                            {<img className='w-full' src = {booking.car_id.imageURL} alt = "No Image Found"></img>}
                                        </div>
                                        <div className='mt-10 font-extrabold text-2xl md:text-3xl'>
                                            {booking.car_id.brand} {booking.car_id.model} ({booking.car_id.year})
                                        </div>
                                        <div className='text-xl mt-2'>
                                            {booking.car_id.seatingCapacity} Seats
                                        </div>
                                        <div className='text-xl mt-2 italic animate-pulse'>
                                            {booking.car_id.pricePerHour} $/hour
                                        </div>
                                        <div className='mt-5 text-xl font-bold animate-bounce italic'>
                                            Booking Price: {booking.bookingPrice}$
                                        </div>
                                        <div className='md:text-xl mt-5'>
                                            <span className='italic font-semibold'>Start Time : </span>
                                            <span className='text-gray-300'> {formatDateTime(booking.bookingDateStartTime)}</span> 
                                        </div>
                                        <div className='md:text-xl'>
                                            <span className='italic font-semibold'>End Time : </span>
                                            <span className='text-gray-300'> {formatDateTime(booking.bookingDateEndTime)}</span> 
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </React.Fragment>
                ) :
                (
                    <div className='italic font-bold h-[400px] text-center mt-60 text-2xl text-gray-600'>
                        No Bookings in the History Made...!
                    </div>
                )
            }
            <Footer />
        </>
    );
}
 
export default CustomerHistoryBookingPage;