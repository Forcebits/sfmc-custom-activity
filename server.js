'use strict';
// Module Dependencies
// -------------------
global.rootRequire = name => require(`${__dirname}/${name}`);

require('dotenv').config();
const express     = require('express');
const path        = require('path');
//const request     = require('request');
const bodyParser  = require('body-parser');
//const mongoose    = require('mongoose');
const routing     = rootRequire('routing');
//const Test        = rootRequire('components/WebNotification/Test').Test;

const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//public folder
app.use(express.static('public'));

//app.get('/', controller.index);
app.use(routing);

app.listen(process.env.PORT || 3000, function(){
    console.log('Your node js server is running');
});

//var test = Object.create(Test.prototype);
//test.run();