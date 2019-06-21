'use strict';
// Module Dependencies
// -------------------
require('dotenv').config();
const express     = require('express');
const path        = require('path');
const request     = require('request');
const routes      = require('./routes');
const mongoose    = require('mongoose');

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

mongoose.set('useNewUrlParser', true);
if(process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
}
else {
    mongoose.connect(process.env.PRE_MONGODB);
}

app.get('/', routes.index);

app.listen(process.env.PORT || 3000, function(){
    console.log('Your node js server is running');
});