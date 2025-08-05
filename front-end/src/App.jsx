import React from 'react';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

//Pages
import DefaultPage from "./pages/defaultPage";
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import MyProfile from './pages/profile';
import About from './pages/about';

//Admin Pages
import AdminHomePage from './pages/admin/adminHomePage';
import RegisterCar from './pages/admin/registerCarPage';
import UpdateCar from './pages/admin/updateCarPage';
import AdminIncomingBids from './pages/admin/incomingBids';
import AdminBookingPage from './pages/admin/upcomingBookings';

//Customer Pages
import CustomerHomePage from './pages/customer/customerHomePage';
import CustomerBiddingForm from './pages/customer/customerBiddingForm';
import CustomerPendingBidsPage from './pages/customer/customerPendingBidsPage';
import CustomerBookingPage from './pages/customer/customerUpComingBookings';
import CustomerHistoryBookingPage from './pages/customer/customerHistoryBookings';

function App() {

  return (
    <React.Fragment>
      <ToastContainer
        position="top-center"         
        autoClose={3000}              
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"                 
      />
      
      <Routes>
        {/*Admin Routes Mount */}
        <Route path = "/admin/home" element = {<AdminHomePage />} />        
        <Route path = "/admin/register-car" element = {<RegisterCar />} />        
        <Route path = "/admin/update-car" element = {<UpdateCar />} />   
        <Route path = "/admin/incoming-bids" element = {<AdminIncomingBids />} />   
        <Route path = "/admin/upcoming-bookings" element = {<AdminBookingPage />} />   
             
        {/*Customer Routes Mount */}
        <Route path = "/customer/home" element = {<CustomerHomePage />} />        
        <Route path = "/customer/bidding-form" element = {<CustomerBiddingForm />} />        
        <Route path = "/customer/pending-bids" element = {<CustomerPendingBidsPage />} />        
        <Route path = "/customer/future-bookings" element = {<CustomerBookingPage />} /> 
        <Route path = "/customer/booking-history" element = {<CustomerHistoryBookingPage />} /> 
    
        {/*General Routes Mount */}
        <Route path = "/login" element = {<LoginPage />} />        
        <Route path = "/signup" element = {<SignupPage />} /> 
        <Route path = "/profile" element = {<MyProfile />} /> 
        <Route path = "/about" element = {<About />} />   
        <Route path = "/" element = {<DefaultPage />} />         
      </Routes>
    </React.Fragment>
  );
}

export default App
