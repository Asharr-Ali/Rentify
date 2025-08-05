import React, { useState, useEffect } from "react";
import axios from "axios";

import CustomerNavbar from "../../components/customerNavbar";
import Footer from "../../components/footer";

import { decodeToken } from "../../components/services/decodeToken";
import ScrollToTop from "../../components/services/scrollToTop";

const apiEndPoint = 'http://localhost:4000/api';

const CustomerPendingBidsPage = () => {
    const [biddings, setBiddings] = useState ([]);

    useEffect (() => {
        async function getBiddedCars () {
            try {
                const { data: biddings } = await axios.get (`${apiEndPoint}/bidding/getBiddings`);
                setBiddings (biddings);
            }
            catch (err) {
                if (err.response && err.response.status === 404) setBiddings ([]);
                else toast.error ('Something went wrong. Try Again!');
            }
        }
        getBiddedCars ();

    }, []);

    const formatDateTime = (dateTime) => {
        return new Date (dateTime).toLocaleString ('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'  
        })
    }

    const biddingStatusFormat = (status) => {
        let className="italic text-xl font-semibold border px-3 py-1 rounded-2xl";
        if (status === 'rejected') className += ' bg-red-700';
        else if (status === 'approved') className += ' bg-green-700';
        else className += ' bg-yellow-500'
        return className;
    }

    return (
        <>
            <ScrollToTop />
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
                <CustomerNavbar user = {decodeToken()} />
            </div>
            {
                biddings.length ? (
                    <React.Fragment>
                        <div className='italic mt-28 text-4xl text-center font-extrabold'>Your Bids of Cars</div>
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
                                        <div className='mt-5 font-bold text-xl'>
                                            {bidding.car_id.transmission} | {bidding.car_id.fuelType}
                                        </div>
                                        <div className='text-xl mt-2'>
                                            {bidding.car_id.seatingCapacity} Seats
                                        </div>
                                        <div className='md:text-xl mt-5'>
                                            <span className='italic font-semibold'>Start Time : </span>
                                            <span className='text-gray-300'> {formatDateTime(bidding.startTime)}</span> 
                                        </div>
                                        <div className='md:text-xl'>
                                            <span className='italic font-semibold'>End Time : </span>
                                            <span className='text-gray-300'> {formatDateTime(bidding.endTime)}</span> 
                                        </div>
                                        <div className='text-xl mt-5 italic animate-bounce mb-5'>
                                            Bidding Price = {bidding.biddingPrice}$
                                        </div>
                                        <span className={biddingStatusFormat(bidding.status)}>
                                            {bidding.status}
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </React.Fragment>
                ) :
                (
                    <div className='italic font-bold h-[400px] text-center mt-60 text-2xl text-gray-600'>
                        You have not bid any Car!
                    </div>
                )
            }
            <Footer />
        </>
    );
}
 
export default CustomerPendingBidsPage;