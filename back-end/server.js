const winston = require ('winston');
const express = require ('express');
const app = express ();
const cors = require ('cors');

app.use (cors());

require ('./startup/logging')();
require ('./startup/routes')(app);
require ('./startup/db')();
require ('./startup/config')();

const PORT = process.env.PORT || 4000;
app.listen ( PORT, () => winston.info (`Listening at Port ${PORT}...`));