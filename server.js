'use strict';
// Module Dependencies
// -------------------
const express     = require('express');
const path        = require('path');
const request     = require('request');
const routes      = require('./routes');

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get('/', routes.index);

app.listen(process.env.PORT || 3000, function(){
    console.log('Your node js server is running');
});