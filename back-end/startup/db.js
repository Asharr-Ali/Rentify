const mongoose = require ('mongoose');
const winston = require ('winston');

//Connecting to MongoDB
module.exports = function () {
    mongoose.connect ('mongodb://localhost:27017/rentify')
    .then (() => winston.info (`Connected to MongoDB...`));
}