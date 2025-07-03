const { Car, 
        validate, 
        validateUpdate } = require ('../models/car');

//Add Car        
const addCar = async function (req, res) {
    const { error } = validate (req.body);
    if (error) return res.status(400).send (error.details[0].message);

    const dupCar = await Car.findOne ({
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        transmission: req.body.transmission,
        pricePerHour: req.body.pricePerHour,
    });
    if (dupCar) return res.status(400).send('Car Already Added!');

    const car = new Car ({
        brand: req.body.brand,
        model: req.body.model, 
        year: req.body.year, 
        transmission: req.body.transmission,
        fuelType: req.body.fuelType,
        pricePerHour: req.body.pricePerHour,
        imageURL: req.body.imageURL,
        addedBy: req.user._id
    });
    await car.save();
    res.send ('Car Added Successfully!');
}   

//Get All Available Cars
const getAvailableCars = async function (req, res) {
    const cars = await Car.find ({ isAvailable: true });
    if (!cars.length) return res.status (404).send ('No Cars Available for Rental!');
    res.send (cars);
}

//Update Car Details By CarID
const updateCar = async function (req, res) {
    const { error } = validateUpdate (req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updatedCar = await Car.findByIdAndUpdate ({ _id: req.body._id }, { 
        $set: req.body }, 
        { runValidators: true });

    if (!updatedCar) return res.status(404).send('No Car Found!');

    res.send('Car Updated Successfully!');    
}

//Remove Car
const removeCar = async function (req, res) {
    const deletedCar = await Car.findByIdAndDelete (req.body._id);
    if (!deletedCar) return res.status(404).send('No Car Found!');
    return res.send('Car Deleted Successfully!');
}


module.exports = { addCar,
                    getAvailableCars,
                    updateCar, 
                    removeCar };