const mongoose = require ('mongoose');
const winston = require ('winston');

//Connecting to MongoDB
module.exports = function () {
    const db = 'mongodb+srv://asharalihabib2003:Zamam12345@rentify.qgtz7gh.mongodb.net/rentify?retryWrites=true&w=majority&appName=Rentify';

    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => winston.info(`Connected to MongoDB...`))
    .catch(err => {
        winston.error(`Could not connect to MongoDB: ${err.message}`);
        process.exit(1); // Exit so Render logs show it failed
    });
};