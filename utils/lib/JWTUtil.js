'use strict';
const JWT          = require('jsonwebtoken');
const ErrorHandler = rootRequire('utils').ErrorHandler;

function decode (token, key, callback){
    if (!token) {
		return callback(new ErrorHandler.appError('Invalid token data', 501, 'the token is empty or undefined', false));
    }
    
    JWT.verify(token.toString('utf8'), 
               key, 
               { algorithm: 'HS256'},
               callback);
};

module.exports.decode = decode;