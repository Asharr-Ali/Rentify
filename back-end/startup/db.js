const mongoose = require ('mongoose');
const winston = require ('winston');

//Connecting to MongoDB
module.exports = function () {
    const db = 'mongodb+srv://itz_asharr_ali:Zamam12345@cluster0.zivbtsg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => winston.info(`Connected to MongoDB...`))
    .catch(err => winston.error(`Could not connect to MongoDB: ${err.message}`));
};