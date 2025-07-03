const { Bidding, 
    validate } = require ('../models/bidding');

const { Car } = require('../models/car');

const mongoose = require ('mongoose');

//Bid a Car
const addBidding = async function (req, res) {
    const { error } = validate (req);
    if (error) return res.status(400).send (error.details[0].message);
    
    const reqBidding = {
        customer_id: req.user._id,
        car_id: req.body.car_id,
        startTime: new Date (req.body.startTime),
        endTime: new Date (req.body.endTime)
    };
    
    const car = await Car.findOne ({
        _id: req.body.car_id
    }).select ('pricePerHour');
    
    if (!car) return res.status (404).send ('Car Not Found!');

    const hours = (reqBidding.endTime - reqBidding.startTime) / 3600000; 

    if (((hours * car.pricePerHour) / 2) > req.body.biddingPrice)
        return res.status (400).send ('You have put too less Bididng Amount!') 

    if (((hours * car.pricePerHour) * 2) < req.body.biddingPrice)
        return res.status (400).send ('You have put too much Bididng Amount!') 

    const dupBidding = await Bidding.findOne (reqBidding);
    if (dupBidding) return res.status(400).send ('Already Bid this Car!');
    
    reqBidding.biddingPrice = req.body.biddingPrice;
    const bidding = new Bidding (reqBidding);
    await bidding.save();
    res.send ('Successfully Bid this Car!');
}

//Get Car Biddings of a Particular Customer 
const getCarBiddingsByCustomerID = async function (req, res) {
    if (!mongoose.Types.ObjectId.isValid (req.body._id)) return res.status (400).send ('Invalid Customer ID!');

    const biddings = await Bidding.find ({ customer_id: req.body._id })
                    .populate ('car_id', 'brand model year imageURL seatingCapacity')
                    .sort ({ createdAt: -1 });
    
    if (!biddings.length) return res.status (404).send ('No Bidding found for this Customer!');

    res.send (biddings);
}

//Get Car Biddings of a Particular Admin 
const getCarBiddingsByAdminID = async function (req, res) {
    const cars = await Car.find ({ addedBy: req.user._id });
    const carIDs = cars.map (car => car._id);
    if (!carIDs.length) return res.status (404).send ('No Car Added By User!');
    
    const biddings = await Bidding.find ({ car_id: { $in: carIDs } })
                                    .populate ('customer_id', 'name email phone')
                                    .populate ('car_id', 'brand model year imageURL seatingCapacity')
                                    .sort ({ createdAt: -1 });
    if (!biddings.length) return res.status (404).send ('No Biddings for User Added Cars!');
    res.send (biddings);
}

//Approve Bidding
const approveBidding = async function (req, res) {
    if (!mongoose.Types.ObjectId.isValid (req.body._id)) return res.status (400).send ('Invalid Bidding ID!');

    const bidding = await Bidding.findById (req.body._id);
    if (!bidding) return res.status (404).send ('No Bidding Found!');

    if (bidding.status == 'approved') return res.status (400).send ('Bidding Already Approved!');

    bidding.status = 'approved';
    await bidding.save();
    res.send ('Bidding Approved Successfully!');
}

//Reject Bidding
const rejectBidding = async function (req, res) {
    if (!mongoose.Types.ObjectId.isValid (req.body._id)) return res.status (400).send ('Invalid Bidding ID!');

    const bidding = await Bidding.findById (req.body._id);
    if (!bidding) return res.status (404).send ('No Bidding Found!');

    if (bidding.status == 'rejected') return res.status (400).send ('Bidding Already Rejected!');

    bidding.status = 'rejected';
    await bidding.save();
    res.send ('Bidding Rejected Successfully!');
}

module.exports = { addBidding,
                    getCarBiddingsByCustomerID,
                    getCarBiddingsByAdminID,
                    approveBidding,
                    rejectBidding };