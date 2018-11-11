const mongoose = require('mongoose');

mongoose.connect(process.env.NOTEBOX_DB_CONNECTION_STRING);

module.exports = mongoose.connection;
