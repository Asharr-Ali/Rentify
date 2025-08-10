import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import AdminNavbar from "../../components/adminNavbar";
import Footer from "../../components/footer";

import { decodeToken } from "../../components/services/decodeToken";
import AdminAuth from './adminAuth';
import ScrollToTop from '../../components/services/scrollToTop'

const apiEndPoint = 'https://rentify-qnpw.onrender.com/api';

const AdminBookingPage = () => {
    const user = AdminAuth ();
    if (!user) return null;
    
    const [bookings, setBookings] = useState ([]);

    useEffect (() => {
        async function getBookings () {
            try {
                const { data: bookings } = await axios.get (`${apiEndPoint}/booking/admin/future`);
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

    const handleCancelBooking = async (Booking) => {
        const filteredBookings = bookings.filter (b => b._id !== Booking._id);

        try {
            await axios.delete (`${apiEndPoint}/bidding/deleteBiddingByID`, { data: { _id: Booking.bidding_id } });   
            await axios.delete (`${apiEndPoint}/booking`, { data: { _id: Booking._id, car_id: Booking.car_id._id } }); 
            toast.success ('Booking Cancelled Successfully!');  
            setBookings (filteredBookings);
        }
        catch (err) {
            if (err.response?.statues === 404) setBookings ([])
            else toast.error (err.response.data);
        }
    }

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
                <AdminNavbar user = {decodeToken()} />
            </div>
            {
                bookings.length ? (
                    <React.Fragment>
                        <div className='italic mt-28 text-4xl text-center font-extrabold'>Upcoming Bookings of Your Added Cars</div>
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
                                        <div className='md:text-xl italic mt-5'>
                                            {booking.customer_id.name}
                                        </div>
                                        <div className='md:text-xl text-justify italic font-sans'>
                                            {booking.customer_id.email}
                                        </div>
                                        <div className='text-xl italic'>
                                            {booking.customer_id.phone}
                                        </div>
                                        <div className='md:text-xl mt-5'>
                                            <span className='italic font-semibold'>Start Time : </span>
                                            <span className='text-gray-300'> {formatDateTime(booking.bookingDateStartTime)}</span> 
                                        </div>
                                        <div className='md:text-xl'>
                                            <span className='italic font-semibold'>End Time : </span>
                                            <span className='text-gray-300'> {formatDateTime(booking.bookingDateEndTime)}</span> 
                                        </div>
                                        <div className='mt-5 text-xl font-bold animate-bounce italic'>
                                            Booking Price: {booking.bookingPrice}$
                                        </div>
                                        <div className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-4'>
                                            <button onClick={() => handleCancelBooking(booking)} className='border px-0.5 md:px-2 py-1 rounded-2xl cursor-pointer hover:bg-red-700'>
                                                Cancel Booking  
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
                        No Bookings For your Cars Added!
                    </div>
                )
            }
            <Footer />
        </>
    );
}
 
export default AdminBookingPage;