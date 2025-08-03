const { Booking, 
        validate } = require ('../models/booking');

const { Car } = require ('../models/car');

const mongoose = require ('mongoose');

//Add Booking
const addBooking = async function (req, res) {
    const { error } = validate (req.body);
    if (error) return res.status(400).send (error.details[0].message);

    const isOverlap = await Booking.findOne({
        car_id: req.body.car_id,
        $or: [
          {
            bookingDateStartTime: { $lt: new Date(req.body.bookingDateEndTime) },
            bookingDateEndTime: { $gt: new Date(req.body.bookingDateStartTime) }
          }
        ]
    });

    if (isOverlap) return res.status(400).send("Car is already booked for this time range.");

    const car = await Car.findById (req.body.car_id);
    if (!car) return res.status (404).send ('No Car Found!');
    
    car.isAvailable = false;
    await car.save ();

    const reqBooking = {
        bidding_id: req.body.bidding_id,
        admin_id: req.user._id,
        customer_id: req.body.customer_id,
        car_id: req.body.car_id,
        bookingDateStartTime: new Date (req.body.bookingDateStartTime),
        bookingDateEndTime: new Date (req.body.bookingDateEndTime)
    };
    
    const booking = new Booking (reqBooking);
    await booking.save();
    res.send ('Booking Added Successfully!');
}

//Get Future Bookings
const futureBookings = async function (req, res) {
    const presentTime = new Date();

    const futureBookings = await Booking.find ({
        customer_id: req.user._id,
        bookingDateStartTime: { $gt: presentTime }
    }).sort ({ bookingDate: 1 });

    if (!futureBookings.length) return res.status (404).send ('No Bookings in Future!');
    res.send (futureBookings);
}

//Get Past Bookings
const pastBookings = async function (req, res) {
    const presentTime = new Date();

    const pastBookings = await Booking.find ({
        customer_id: req.user._id,
        bookingDateEndTime: { $lte: presentTime }
    }).sort ({ bookingDate: -1 });

    if (!pastBookings.length) return res.status (404).send ('No Bookings in Past!');
    res.send (pastBookings);
}

//Remove Booking By ID
const removeBooking = async function (req, res) {
    if (!mongoose.Types.ObjectId.isValid (req.body._id)) return res.status (400).send ('Invalid Booking ID!');

    const car = await Car.findById (req.body.car_id);
    if (!car) return res.status (404).send ('No Car Found!');
    
    car.isAvailable = true;
    await car.save ();

    const booking = await Booking.findByIdAndDelete (req.body._id);
    if (!booking) return res.status(404).send ('Booking Not Found!');
    res.send ('Booking Deleted Successfully!');   
}

//Remove All Bookings
const removeAllBookings = async function (req, res) {
    if (!mongoose.Types.ObjectId.isValid (req.body.car_id)) return res.status (400).send ('Invalid Car ID!');

    const car_id = req.body.car_id;
        await Booking.deleteMany ({ car_id: car_id });

    res.send ('Booking Deleted Successfully!');   
}


//Get Future Bookings By Admin ID
const futureBookingsByAdminID = async function (req, res) {
    const presentTime = new Date();

    const futureBookings = await Booking.find ({
        admin_id: req.user._id,
        bookingDateStartTime: { $gt: presentTime }
    })
    .populate ('customer_id', 'name email phone')
    .populate ('car_id', 'brand model year imageURL seatingCapacity pricePerHour')
    .sort ({ bookingDate: 1 });

    if (!futureBookings.length) return res.status (404).send ('No Bookings For Your Added Cars in Future!');
    res.send (futureBookings);
}

module.exports = { addBooking,
                    futureBookings,
                    pastBookings,
                    removeBooking,
                    removeAllBookings,
                    futureBookingsByAdminID };