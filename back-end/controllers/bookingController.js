const { Booking, 
        validate } = require ('../models/booking');

const { Car } = require ('../models/car');

//Add Booking
const addBooking = async function (req, res) {
    const { error } = validate (req.body);
    if (error) return res.status(400).send (error.details[0].message);

    const reqBooking = {
        customer_id: req.user._id,
        car_id: req.body.car_id,
        bookingDate: new Date (req.body.bookingDate)
    };

    const dupBooking = await Booking.findOne (reqBooking);
    if (dupBooking) return res.status(400).send ('Booking Already Added!');

    const car = await Car.findById (req.body.car_id);
    if (!car) return res.status (404).send ('No Car Found!');
    
    car.isAvailable = false;
    await car.save ();

    const booking = new Booking (reqBooking);
    await booking.save();
    res.send ('Booking Added Successfully!');
}

//Get Future Bookings
const futureBookings = async function (req, res) {
    const presentTime = new Date();

    const futureBookings = await Booking.find ({
        customer_id: req.user._id,
        bookingDate: { $gt: presentTime }
    }).sort ({ bookingDate: 1 });

    if (!futureBookings.length) return res.status (404).send ('No Bookings in Future!');
    res.send (futureBookings);
}

//Get Past Bookings
const pastBookings = async function (req, res) {
    const presentTime = new Date();

    const pastBookings = await Booking.find ({
        customer_id: req.user._id,
        bookingDate: { $lte: presentTime }
    }).sort ({ bookingDate: -1 });

    if (!pastBookings.length) return res.status (404).send ('No Bookings in Past!');
    res.send (pastBookings);
}

//Remove Booking
const removeBooking = async function (req, res) {
    const { error } = validate (req.body);
    if (error) return res.status(401).send (error.details[0].message);

    const delBooking = {
        customer_id: req.user._id,
        car_id: req.body.car_id,
        bookingDate: req.body.bookingDate
    };

    const booking = await Booking.findOneAndDelete (delBooking);
    if (!booking) return res.status(404).send ('Booking Not Found!');

    res.send ('Booking Deleted Successfully!');   
}

module.exports = { addBooking,
                    futureBookings,
                    pastBookings,
                    removeBooking };