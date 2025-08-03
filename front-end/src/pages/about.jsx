import React from 'react';

import Navbar from '../components/navbar';
import AdminNavbar from '../components/adminNavbar'
import CustomerNavbar from '../components/customerNavbar'
import Footer from '../components/footer';

import { decodeToken } from "../components/services/decodeToken";

function getNavbar () {
    const user = decodeToken();
    if (!user) return <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
                            <Navbar />
                       </div> ;
    if (user.isAdmin) return <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
                                <AdminNavbar user = {user} />
                              </div> ;
    return <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
                <CustomerNavbar user = {user} />
             </div> ;;
}

const About = () => {
    return (
        <>
            {
                getNavbar ()
            }
            <div className="p-2 md:p-10 min-h-screen md:h-[700px] grid place-items-center m-5 mt-36 md:mt-36 md:m-16 bg-black rounded-2xl  text-white">
              <h1 className="text-2xl md:text-5xl font-extrabold mb-4">Rentify – Car Rental System</h1>
        
              <p className="mb-4 text-xl md:text-3xl font-bold">
                Web-based Car Rental Platform
              </p>
        
              <p className="mb-10 md:mb-4 text-3xl">
                Customer, Admin
              </p>
        
              <p className="mb-10 md:mb-4 text-xl animate-pulse text-justify">
                Rentify allows customers to browse rental cars, place bids, and get bookings confirmed once the admin approves their offer. Admins manage car listings and control the bidding/booking process.
              </p>
        
              <ul className="list-disc list-inside md:text-xl mb-20 md:mb-4">
                <li><strong>Authentication:</strong> Customers and admins log in with role-based access.</li>
                <li><strong>Car Management (Admin):</strong> Admins can add, update, or remove cars.</li>
                <li><strong>Car Browsing (Customer):</strong> Customers can view and explore available rental cars.</li>
                <li><strong>Bidding:</strong> Customers place bids; admins accept or reject them.</li>
                <li><strong>Booking Confirmation:</strong> Admin confirms the booking after accepting a bid.</li>
              </ul>
        
              <p className='text-xl animate-bounce mb-10 md:mb-4 text-justify'>
                Only available cars are shown to customers. A car becomes unavailable after booking is confirmed.
              </p>
            </div>
            <Footer />
        </>
      );
}
 
export default About;