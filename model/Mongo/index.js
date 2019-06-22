const ErrorHandler = rootRequire('utils').ErrorHandler;
const DocumentInfo = rootRequire('model').DocumentInfo;
const mongoose    = require('mongoose');

function Model(){
    let model = Object.create(Model.prototype);
    model.schema = mongoose.schema;
    return model;
}

Model.prototype.getConnection = function(){
    mongoose.set('useNewUrlParser', true);
    if(process.env.MONGODB_URI) {
        this.context = mongoose.connect(process.env.MONGODB_URI);
    }
    else {
        this.context = mongoose.connect(process.env.PRE_MONGODB);
    }
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('Connected to Mongo');
    });
    return this.context;
}

Model.prototype.setDocumentSchema = function (documentInfo, collectionName){
    if (typeof collectionName == 'string' || collectionName instanceof String) {
        if (documentInfo instanceof DocumentInfo){
            return new this.schema(documentInfo.name, documentInfo.schema, { collection: collectionName });
        } else {
            throw new ErrorHandler.appError('documentInfo variable is not of a type DocumentInfo', 501, '', false);
        }
    } else {
        throw new ErrorHandler.appError('collectionName variable is not a string', 501, '', false);
    }
}

module.exports.Mongo = Model;