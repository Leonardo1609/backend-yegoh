const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.set( 'port', process.env.PORT || 4000 );

app.use( morgan('dev') );
app.use( express.json({ extended: false }) );
app.use( cors() );

app.use( '/api/users', require('./routes/users') );

module.exports = app;