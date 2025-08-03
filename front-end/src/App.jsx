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
        <Route path = "/" element = {<DefaultPage />} />        
        <Route path = "/login" element = {<LoginPage />} />        
        <Route path = "/signup" element = {<SignupPage />} /> 
        <Route path = "/profile" element = {<MyProfile />} /> 
        <Route path = "/about" element = {<About />} /> 
  
        <Route path = "/admin/home" element = {<AdminHomePage />} />        
        <Route path = "/admin/register-car" element = {<RegisterCar />} />        
        <Route path = "/admin/update-car" element = {<UpdateCar />} />   
        <Route path = "/admin/incoming-bids" element = {<AdminIncomingBids />} />   
        <Route path = "/admin/upcoming-bookings" element = {<AdminBookingPage />} />   
             
        <Route path = "/customer/home" element = {<CustomerHomePage />} />        
        <Route path = "/customer/bidding-form" element = {<CustomerBiddingForm />} />        
      </Routes>
    </React.Fragment>
  );
}

export default App
