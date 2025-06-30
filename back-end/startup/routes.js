const errorHandler = require ('../middleware/error');
const express = require ('express');

const customerRoutes = require ('../routes/customerRoutes');
const carRoutes = require ('../routes/carRoutes');
const bookingRoutes = require ('../routes/bookingRoutes');
const biddingRoutes = require ('../routes/biddingRoutes');

module.exports = function (app) {
    app.use (express.json());
    app.get ('/', (req, res) => res.send ('Backend Running!'));
    app.use ('/api/customer', customerRoutes);
    app.use ('/api/car', carRoutes);
    app.use ('/api/booking', bookingRoutes);
    app.use ('/api/bidding', biddingRoutes);

    app.use (errorHandler);
}