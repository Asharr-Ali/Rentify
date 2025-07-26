import React from 'react';

const Footer = () => {
    return ( 
        <footer className='bg-black text-white w-full h-auto'>
            <div className='px-10 py-10 md:px-20 md:py-20 lg:px-40'>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    <div>
                        <div className="text-3xl font-bold mb-4">Rentify</div>
                        <div className='text-base md:text-xl'>
                            <p className="mt-2">Email: support@rentify.com</p>
                            <p className="mt-1">Phone: +92 123 4567890</p>
                            <p className="mt-1">Location: Lahore, Pakistan</p>
                        </div>
                    </div>

                    <div>
                        <div className="text-3xl font-bold mb-4">Go Anywhere with Rentify</div>
                        <div className='text-sm md:text-base lg:text-lg text-gray-300'>
                            <p>Customer Support Hours:</p>
                            <p>Mon – Sat: 9:00 AM – 10:00 PM</p>
                            <p>Sun: 10:00 AM – 6:00 PM</p>
                        </div>
                    </div>

                </div>

                <div className='md:ml-24 lg:ml-52 text-2xl mt-10 font-bold'>
                    &copy; 2025 Rentify. All Rights Reserved!
                </div>

            </div>
        </footer>
    );
}
 
export default Footer;
