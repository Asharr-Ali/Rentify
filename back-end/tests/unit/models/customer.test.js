const { Customer } = require ('../../../models/customer');
const jwt = require ('jsonwebtoken');
const config = require ('config');
const mongoose = require ('mongoose');

describe ('Token Validation', () => {
    it ('Should return Valid token', () => {
        const payLoad = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true };
        const customer = new Customer (payLoad);
        const token = customer.generateAuthToken();
        const decoded = jwt.verify (token, config.get ('JWT_PRIVATE_KEY'));
        expect (decoded).toMatchObject (payLoad);
    });
});