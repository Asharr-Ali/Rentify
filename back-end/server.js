const winston = require('winston');

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message, err.stack);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => winston.info(`Listening at Port ${PORT}...`));