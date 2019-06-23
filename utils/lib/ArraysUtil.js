'use strict';

function validateTypeOfElements(_list, _type){
    const allEqual = arr => arr.every( v => v instanceof _type );
    return allEqual(_list);
}

module.exports.validateTypeOfElements = validateTypeOfElements;