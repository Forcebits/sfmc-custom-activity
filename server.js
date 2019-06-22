'use strict';
// Module Dependencies
// -------------------
global.rootRequire = name => require(`${__dirname}/${name}`);

require('dotenv').config();
const express     = require('express');
const path        = require('path');
const request     = require('request');
const mongoose    = require('mongoose');
const routes      = rootRequire('routes');
const Test  = rootRequire('components/WebNotification/Test').Test;

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get('/', routes.index);

app.listen(process.env.PORT || 3000, function(){
    console.log('Your node js server is running');
});

var test = Object.create(Test.prototype);
test.run();