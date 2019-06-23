'use strict';

function appError(name, httpCode, description, isOperational) {
    Error.call(this);
    Error.captureStackTrace(this);
    this.name = name;
    this.description = description;
    this.isOperational = isOperational;
    this.httpCode = httpCode;
};

appError.prototype.__proto__ = Error.prototype;

module.exports.appError = appError;

// Example 
// throw new ErrorHandler("resourceNotFound", 404, "further explanation", true)