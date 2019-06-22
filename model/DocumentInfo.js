const ErrorHandler = rootRequire('utils').ErrorHandler;

function DocumentInfo(name, schema){
    let documentInfo = Object.create(DocumentInfo.prototype);
    documentInfo.name;
    documentInfo.schema;

    if (typeof name == 'string' || name instanceof String) {
        documentInfo.name = name;
    } else {
        throw new ErrorHandler.appError('name variable is not a string', 501, '', false);
    }
    
    if (schema.constructor == Object){
        documentInfo.schema = schema;
    } else {
        throw new ErrorHandler.appError('schema variable is not a dictionary', 501, '', false);
    }
    return documentInfo;
}

module.exports = DocumentInfo;