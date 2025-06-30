const mongoose = require ('mongoose');
const winston = require ('winston');
const config = require ('config');

//Connecting to MongoDB
module.exports = function () {
    const db = config.get ('db');
mongoose.connect (db)
    .then (() => winston.info (`Connected to ${db}...`));
}