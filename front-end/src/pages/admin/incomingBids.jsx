import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import AdminNavbar from '../../components/adminNavbar';
import Footer from '../../components/footer';

import { decodeToken } from '../../components/services/decodeToken';
import AdminAuth from './adminAuth';
import ScrollToTop from '../../components/services/scrollToTop'

const apiEndPoint = 'http://localhost:4000/api';

const AdminIncomingBids = () => {
    const user = AdminAuth ();
    if (!user) return null;

    const [biddings, setBiddings] = useState ([]);

    useEffect (() => {
        async function getBiddedCars () {
            try {
                const { data: biddings } = await axios.get (`${apiEndPoint}/bidding`);
                setBiddings (biddings);
            }
            catch (err) {
                if (err.response && err.response.status === 404) setBiddings ([]);
                else toast.error ('Something went wrong. Try Again!');
            }
        }
        getBiddedCars ();

    }, []);

    const handleAcceptBiddingAndAddBooking = async (Bidding) => {
        const booking = {
            bidding_id: Bidding._id,
            customer_id: Bidding.customer_id._id,
            car_id: Bidding.car_id._id,
            bookingDateStartTime: Bidding.startTime, 
            bookingDateEndTime: Bidding.endTime 
        }
        const BiddingID = Bidding._id;
        const filteredBiddings = biddings.filter (b => b._id !== BiddingID);
    
        try {
            await axios.post (`${apiEndPoint}/booking`, booking);
            await axios.post (`${apiEndPoint}/bidding/approve`, { _id: BiddingID });
            toast.success ('Bid Accepted and Booking Added Successfully!');
            setBiddings (filteredBiddings);
        }
        catch (err) {
            if (err.response && err.response.status === 400) toast.error (err.response.data);
            else if (err.response?.status === 404) toast.error (err.response.data);
            else toast.error (err.response.data);
        }
    }

    const handleRejectBidding = async (Bidding) => {
        const BiddingID = Bidding._id;

        const filteredBiddings = biddings.filter (b => b._id !== Bidding._id);

        try {
            await axios.post (`${apiEndPoint}/bidding/reject`, { _id: BiddingID });
            toast.success ('Bid Rejected Successfully!');
            setBiddings (filteredBiddings);
        }
        catch (err) {
            if (err.response && err.response.status === 400) toast.error (err.response.data);
            else if (err.response?.status === 404) toast.error (err.response.data);
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
                biddings.length ? (
                    <React.Fragment>
                        <div className='italic mt-28 text-4xl text-center font-extrabold'>Your Added Cars Bids</div>
                        <div className='m-10 md:m-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10'>
                            {
                                biddings.map (bidding => (
                                    <div key={bidding._id} className='p-4 lg:p-10 border bg-black text-white rounded-xl transition-transform duration-300 ease-in-out hover:scale-105'>
                                        <div>
                                            {<img className='w-full' src = {bidding.car_id.imageURL} alt = "No Image Found"></img>}
                                        </div>
                                        <div className='mt-10 font-extrabold text-2xl md:text-3xl'>
                                            {bidding.car_id.brand} {bidding.car_id.model} ({bidding.car_id.year})
                                        </div>
                                        <div className='text-xl mt-2'>
                                            {bidding.car_id.seatingCapacity} Seats
                                        </div>
                                        <div className='text-xl mt-2 italic animate-pulse'>
                                            {bidding.car_id.pricePerHour} $/hour
                                        </div>
                                        <div className='md:text-xl italic mt-5'>
                                            {bidding.customer_id.name}
                                        </div>
                                        <div className='md:text-xl text-justify italic font-sans'>
                                            {bidding.customer_id.email}
                                        </div>
                                        <div className='text-xl italic'>
                                            {bidding.customer_id.phone}
                                        </div>
                                        <div className='md:text-xl mt-5'>
                                            <span className='italic font-semibold'>Start Time : </span>
                                            <span className='text-gray-300'> {formatDateTime(bidding.startTime)}</span> 
                                        </div>
                                        <div className='md:text-xl'>
                                            <span className='italic font-semibold'>End Time : </span>
                                            <span className='text-gray-300'> {formatDateTime(bidding.endTime)}</span> 
                                        </div>
                                        <div className='text-xl mt-5 italic animate-bounce'>
                                            Bidding Price = {bidding.biddingPrice}$
                                        </div>
                                        <div className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-4'>
                                            <button onClick={() => handleAcceptBiddingAndAddBooking(bidding)} className='border px-0.5 md:px-2 py-1 rounded-2xl cursor-pointer hover:bg-gray-900'>
                                                Accept Bid  
                                            </button>
                                            <button onClick={() => handleRejectBidding(bidding)} className='border px-2 py-1 rounded-2xl cursor-pointer hover:bg-gray-900'>
                                                Reject Bid
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
                        No Bidding For your Cars Added!
                    </div>
                )
            }
            <Footer />
        </>

    );
}
 
export default AdminIncomingBids;