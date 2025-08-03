import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router";

import AdminNavbar from "../components/adminNavbar";
import CustomerNavbar from "../components/customerNavbar";
import Footer from "../components/footer";

import { decodeToken } from "../components/services/decodeToken";
import ScrollToTop from '../components/services/scrollToTop'

const apiEndPoint = 'http://localhost:4000/api';

const MyProfile = () => {
    const [user, setUser] = useState ({});
    const Navigate = useNavigate();

    useEffect (() => {
        const jwt = localStorage.getItem('token');
        if (!jwt) {
            Navigate('/');
            return;
        }

        async function getUser () {
            try {
                const { data: user } = await axios.get (`${apiEndPoint}/customer/me`);
                setUser (user);
            }
            catch (err) {
                if (err.response && err.response.status === 404) toast.error ('No User Found!');
                else toast.error ('Something went wrong. Try Again!');
            }
        } 

        getUser ();
        
    }, []);

    if (!decodeToken()) return;

    return ( 
        <>
            <ScrollToTop />
            { 
                user.isAdmin ? <AdminNavbar user = {decodeToken()} /> : <CustomerNavbar user = {decodeToken()} />
            }
            <div className="h-[350px] grid place-items-center rounded-2xl">
                <div className="bg-black text-white rounded-2xl p-10 text-3xl grid gap-5">
                    <div className="text-center text-5xl animate-pulse">
                        {user.isAdmin ? <span>Admin</span> : <span>Customer</span> }
                    </div>
                    <div>
                        {user.name}
                    </div>
                    <div>
                        {user.email}
                    </div>
                    <div>
                        {user.phone}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
 
export default MyProfile;