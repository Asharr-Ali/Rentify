import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router';
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [menuIcon, setMenuIcon] = useState(false);

    return ( 
        <nav>
            <div className='hidden md:p-4 md:text-white md:bg-black md:flex md:justify-between'>
                <div className='ml-10'>
                    <Link to = '/' className='inline-block text-3xl font-bold cursor-pointer'>Rentify</Link>
                    <Link to = '/about' className='text-xl ml-10 px-2 py-0.5 cursor-pointer border rounded-2xl border-black hover:bg-gray-800'>About</Link>
                </div>
                <div className='mr-20'>
                    <Link to = '/login' className='inline-block text-xl mr-10 px-2 py-0.5 cursor-pointer border rounded-2xl border-black hover:bg-gray-800 '>Log in</Link>
                    <Link to = '/signup' className='inline-block border p-1 rounded-xl bg-white text-black cursor-pointer hover:bg-amber-50'>Sign up</Link>
                </div>
            </div>
            <div className='md:hidden p-4 bg-black flex justify-between text-white'>
                <Link to = '/' className='text-3xl font-bold cursor-pointer'>
                    Rentify
                </Link>
                <button onClick={() => setMenuIcon(!menuIcon)} className='md:hidden'>{menuIcon ? (<FaTimes className='w-6 h-6'/>): (<FaBars className='w-6 h-6'/>)}</button>
            </div>
            {
                menuIcon && (
                    <div className='md:hidden flex flex-col bg-black text-white text-2xl p-10'>
                        <Link to = '/about'>About</Link>
                        <Link to = '/login'>Log in</Link>
                        <Link to = '/signup'>Sign up</Link>
                    </div>
                )
            }
        </nav>
    );
}
 
export default Navbar;