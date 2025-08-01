import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router';

import { FaBars, FaTimes } from "react-icons/fa";

const CustomerNavbar = ({ user }) => {
    const [menuIcon, setMenuIcon] = useState (false);

    return ( 
        <nav>
            <div className='hidden 2xl:p-4 2xl:text-white 2xl:bg-black 2xl:flex 2xl:justify-between'>
                <div>
                    <Link to = '/customer/home' className='italic inline-block text-4xl font-extrabold cursor-pointer'>Rentify</Link>
                    <Link to = '/upcoming-bookings' className='italic text-xl ml-1 px-2 py-0.5 cursor-pointer border rounded-2xl border-black hover:bg-gray-800'>Upcoming Bookings</Link>
                    <Link to = '/booking-history' className='italic text-xl ml-1 px-2 py-0.5 cursor-pointer border rounded-2xl border-black hover:bg-gray-800'>Booking History</Link>
                    <Link to = '/profile' className='italic text-xl ml-1 px-2 py-0.5 cursor-pointer border rounded-2xl border-black hover:bg-gray-800'>My Profile</Link>
                    <Link to = '/about' className='italic text-xl ml-1 px-2 py-0.5 cursor-pointer border rounded-2xl border-black hover:bg-gray-800'>About</Link>
                </div>
                <div className='mr-20'>
                    <span className='italic inline-block text-3xl mr-10 px-2 py-0.5 cursor-pointer border rounded-2xl border-black hover:bg-gray-800 font-extrabold'>{user.name}</span>
                    <span className='italic inline-block text-2xl mr-10 px-2 py-0.5 cursor-pointer border rounded-2xl border-black hover:bg-gray-800 font-extrabold'>Customer</span>
                    <Link to = '/logout' className='italic inline-block border p-1 rounded-xl bg-white text-black cursor-pointer hover:bg-amber-50'>Log out</Link>
                </div>
            </div>
            <div className='2xl:hidden p-4 bg-black flex justify-between text-white'>
                <Link to = '/' className='italic text-3xl font-bold cursor-pointer'>
                    Rentify
                </Link>
                <span className='hidden italic sm:inline-block sm:text-3xl mr-10 px-2 py-0.5 cursor-pointer border rounded-2xl border-black hover:bg-gray-800 font-extrabold'>{user.name}</span>
                <span className='hidden italic sm:inline-block sm:text-3xl mr-10 px-2 py-0.5 cursor-pointer border rounded-2xl border-black hover:bg-gray-800 font-extrabold'>Customer</span>
                <button onClick={() => setMenuIcon(!menuIcon)} className='2xl:hidden'>{menuIcon ? (<FaTimes className='w-6 h-6'/>): (<FaBars className='w-6 h-6'/>)}</button>
            </div>
            {
                menuIcon && (
                    <div className='2xl:hidden italic flex flex-col bg-black text-white text-2xl p-10'>
                        <Link to = '/incoming-bids'>Incoming Bids</Link>
                        <Link to = '/upcoming-bookings'>Upcoming Bookings</Link>
                        <Link to = '/booking-history'>Booking History</Link>
                        <Link to = '/profile'>My Profile</Link>
                        <Link to = '/about'>About</Link>
                        <Link to = '/logout'>Log out</Link>
                    </div>
                )
            }
        </nav>
    );
}
 
export default CustomerNavbar;