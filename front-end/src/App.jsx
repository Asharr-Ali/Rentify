import React from 'react';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

//Pages
import DefaultPage from "./pages/defaultPage";
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';

//Admin Pages
import AdminHomePage from './pages/admin/adminHomePage';
import RegisterCar from './pages/admin/registerCarPage';

//Customer Pages
import CustomerHomePage from './pages/customer/customerHomePage';

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
        <Route path = "/admin/home" element = {<AdminHomePage />} />        
        <Route path = "/admin/register-car" element = {<RegisterCar />} />        
        <Route path = "/customer/home" element = {<CustomerHomePage />} />        
      </Routes>
    </React.Fragment>
  );
}

export default App
