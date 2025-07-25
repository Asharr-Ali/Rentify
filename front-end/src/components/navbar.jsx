import React from 'react';
import { useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [menuIcon, setMenuIcon] = useState(false);

    return ( 
        <nav>
            <div className='hidden md:p-4 md:text-white md:bg-black md:flex md:justify-between'>
                <div className='ml-10'>
                    <span className='text-3xl font-bold cursor-pointer'>Rentify</span>
                    <button className='text-xl ml-10 px-2 py-0.5 cursor-pointer hover:border hover:rounded-2xl hover:bg-gray-800 hover:border-black '>About</button>
                </div>
                <div className='mr-20'>
                <button className='text-xl mr-10 px-2 py-0.5 cursor-pointer hover:border hover:rounded-2xl hover:bg-gray-800 hover:border-black '>Log in</button>
                    <button className='border p-1 rounded-xl bg-white text-black cursor-pointer hover:bg-amber-50'>Sign up</button>
                </div>
            </div>
            <div className='md:hidden p-4 bg-black flex justify-between text-white'>
                <div className='text-3xl font-bold cursor-pointer'>
                    Rentify
                </div>
                <button onClick={() => setMenuIcon(!menuIcon)} className='md:hidden'>{menuIcon ? (<FaTimes className='w-6 h-6'/>): (<FaBars className='w-6 h-6'/>)}</button>
            </div>
            {
                menuIcon && (
                    <div className='md:hidden flex flex-col bg-black text-white text-2xl p-10'>
                        <button>About</button>
                        <button>Log in</button>
                        <button>Sign up</button>
                    </div>
                )
            }
        </nav>
    );
}
 
export default Navbar;