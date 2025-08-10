const mongoose = require ('mongoose');
const winston = require ('winston');

//Connecting to MongoDB
module.exports = function () {
    mongoose.connect ('mongodb+srv://asharalihabib2003:Zamam12345@rentify.qgtz7gh.mongodb.net/?retryWrites=true&w=majority&appName=Rentify')
    .then (() => winston.info (`Connected to MongoDB...`));
}