import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';

import CustomerNavbar from '../../components/customerNavbar';
import Footer from '../../components/footer';

import { decodeToken } from '../../components/services/decodeToken';
import CustomerAuth from './customerAuth';
import ScrollToTop from '../../components/services/scrollToTop';

const apiEndPoint = 'https://rentify-qnpw.onrender.com/api';

const CustomerBiddingForm = () => {
    const user = CustomerAuth();
    if (!user) return null;

    const Location = useLocation();
    const car = Location.state?.car;

    const Navigate = useNavigate();
    
    const [formData, setFormData] = useState ({
        startTime: '',
        endTime: '',
        biddingPrice: 0
    });

    const handleChange = ({ currentTarget: input }) => {
        setFormData((prev) => ({
            ...prev,
            [input.name]: input.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.car_id = car._id;
        console.log (formData)

        try {
            console.log (await axios.post(`${apiEndPoint}/bidding`, formData));
            toast.success('Successfully Bid this Car!');
            setTimeout(() => {
                Navigate('/customer/home');
            }, 3000);
        } catch (err) {
            console.log (err)
            if (err.response && err.response.data) toast.error(err.response.data);
            else toast.error('Something went wrong. Try Again!');
        }
    }

    return ( 
        <>
            <ScrollToTop />
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
                <CustomerNavbar user = {decodeToken()} />
            </div>
            <form onSubmit={handleSubmit} className='h-[700px] mt-20 grid place-items-center'>
                <div className='bg-black text-white rounded-2xl p-7 md:p-14'>
                  <div className='text-center text-3xl md:text-5xl mb-10 font-extrabold'>Bidding Page</div>

                  <div>
                    <label htmlFor='startTime' className='block italic text-4xl font-bold'>Start Time</label>
                    <input
                      className='mt-3 bg-gray-800 w-full border focus:outline-none focus:border-amber-100 rounded-2xl px-3 py-1'
                      type='datetime-local'
                      name='startTime'
                      onChange={handleChange}
                      value={formData.startTime}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor='endTime' className='block italic text-4xl font-bold mt-5'>End Time</label>
                    <input
                      className='mt-3 w-full bg-gray-800 border focus:outline-none focus:border-amber-100 rounded-2xl px-3 py-1'
                      type='datetime-local'
                      name='endTime'
                      onChange={handleChange}
                      value={formData.endTime}
                      required
                    />
                  </div>
                  
                  <div>
                    <h1 className='mt-5 italic text-4xl font-bold'>Bidding Price</h1>
                    <input
                      className='mt-3 w-full border focus:outline-none focus:border-amber-100 rounded-2xl px-3 py-1'
                      onChange={handleChange}
                      type='number'
                      name='biddingPrice'
                      value={formData.biddingPrice}
                      required
                    />
                  </div>
                  
                  <button className='border mt-5 text-xl px-3 py-1 rounded-2xl hover:bg-gray-700 cursor-pointer'>
                    Submit Bid
                  </button>
                </div>
            </form>
            <Footer />
        </>
    );
}
 
export default CustomerBiddingForm;