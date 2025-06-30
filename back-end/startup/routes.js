const errorHandler = require ('../middleware/error');
const express = require ('express');

const customerRoutes = require ('../routes/customerRoutes');
const carRoutes = require ('../routes/carRoutes');

module.exports = function (app) {
    app.use (express.json());
    app.get ('/', (req, res) => res.send ('Backend Running!'));
    app.use ('/api/customer', customerRoutes);
    app.use ('/api/car', carRoutes);

    app.use (errorHandler);
}