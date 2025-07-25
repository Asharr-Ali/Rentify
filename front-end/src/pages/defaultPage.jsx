import Navbar from "../components/navbar";

const DefaultPage = () => {
    return ( 
        <div>
            <Navbar />
            <div className="flex flex-col xl:flex-row md:gap-10 mb-30 ">
                <div>
                    <div className="mt-20 ml-10 md:ml-32 md:mr-32 font-bold md:text-5xl text-3xl">Go Anywhere with Rentify</div>
                    <div className="md:text-2xl text-justify md:w-[500px] m-10 md:ml-32 md:mr-32 text-gray-700">Your one-stop platform for hassle-free rentals.
                        List properties, browse listings, and connect with trusted renters.
                        Manage your rentals, track activity, and stay organized — all online.
                        Simple. Secure. Smart. Start renting the easy way today.
                    </div>
                    <button className="ml-10 md:ml-32 p-4 rounded-xl border text-white text-xl bg-black cursor-pointer hover:bg-gray-900">
                        See Prices
                    </button>
                </div>
                <div className="mt-5 md:mt-20 xl:w-[600px] rounded-2xl">
                    <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_896,w_1344/v1712926828/assets/a3/cf8564-e2a6-418c-b9b0-65dd285c100b/original/3-2-ridesharing-new.jpg"></img>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row md:gap-10 mb-30">
                <div>
                    <div className="mt-20 ml-10 md:ml-32 md:mr-32 font-bold md:text-5xl text-3xl">Log in to see your account details</div>
                    <div className="md:text-2xl text-justify md:w-[500px] m-10 md:ml-32 md:mr-32 text-gray-700">View past trips, tailored suggestions, support resources, and more.
                    </div>
                    <button className="ml-10 md:ml-32 p-4 rounded-xl border text-white text-xl bg-black cursor-pointer hover:bg-gray-900">
                        Log in to your account
                    </button>
                    <button className="ml-10 md:ml-32 p-4 border-b-1 text-xl cursor-pointer">
                        Create an Account
                    </button>
                </div>
                <div className="mt-5 md:mt-20 mr-20 w-full xl:w-[600px] rounded-2xl">
                    <img src="https://www.uber-assets.com/image/upload/v1753139368/assets/85/0e6b6d-a29e-4960-bcab-46de99547d24/original/Signup-roundededge-1.svg"></img>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row md:gap-10 mb-30">
                <div className="mt-5 xl:ml-32 md:mt-20 w-full xl:w-[600px] rounded-2xl">
                    <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1152,w_1152/v1684855112/assets/96/4dd3d1-94e7-481e-b28c-08d59353b9e0/original/earner-illustra.png"></img>
                </div>
                <div>
                    <div className="mt-20 ml-10 md:ml-32 md:mr-32 font-bold md:text-5xl text-3xl">Drive when you want, make what you need</div>
                    <div className="md:text-2xl text-justify md:w-[500px] m-10 md:ml-32 md:mr-32 text-gray-700">Make money on your schedule with deliveries or rides—or both. You can use choose a rental through Rentify.
                    </div>
                    <button className="ml-10 md:ml-32 p-4 rounded-xl border text-white text-xl bg-black cursor-pointer hover:bg-gray-900">
                        Get Started
                    </button>
                    <button className="ml-10 md:ml-32 p-4 border-b-1 text-xl cursor-pointer">
                        Already have an account? Sign in
                    </button>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row md:gap-10 mb-30 ">
                <div>
                    <div className="mt-20 ml-10 md:ml-32 md:mr-32 font-bold md:text-5xl text-3xl">The Rentify you know, reimagined for business</div>
                    <div className="md:text-2xl text-justify md:w-[500px] m-10 md:ml-32 md:mr-32 text-gray-700">Rentify for Business is a platform for managing global rides and meals, and local deliveries, for companies of any size.
                    </div>
                    <button className="ml-10 md:ml-32 p-4 rounded-xl border text-white text-xl bg-black cursor-pointer hover:bg-gray-900">
                        Get Started
                    </button>
                </div>
                <div className="mt-5 md:mt-20 lg:mr-20 xl:w-[600px] rounded-2xl">
                    <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1152,w_1152/v1684887108/assets/76/baf1ea-385a-408c-846b-59211086196c/original/u4b-square.png"></img>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row md:gap-10 mb-30 ">
                <div>
                    <div className="mt-20 ml-10 md:ml-32 md:mr-32 font-bold md:text-5xl text-3xl">Make money by renting out your car</div>
                    <div className="md:text-2xl text-justify md:w-[500px] m-10 md:ml-32 md:mr-32 text-gray-700">Connect with thousands of drivers and earn more per week with Rentify.
                    </div>
                    <button className="ml-10 md:ml-32 p-4 rounded-xl border text-white text-xl bg-black cursor-pointer hover:bg-gray-900">
                        Get Started
                    </button>
                </div>
                <div className="mt-5 md:mt-20 lg:mr-20 xl:w-[600px] rounded-2xl">
                    <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1152,w_1152/v1696243819/assets/18/34e6fd-33e3-4c95-ad7a-f484a8c812d7/original/fleet-management.jpg"></img>
                </div>
            </div>
        </div>
    );
}
 
export default DefaultPage;