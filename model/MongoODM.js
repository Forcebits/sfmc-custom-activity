const ErrorHandler = rootRequire('utils').ErrorHandler;
const mongoose    = require('mongoose');

function Mongo(){
    let mongo = Object.create(Mongo.prototype);
    mongo.context;
    return mongo;
}

Mongo.prototype.getConnection = function(){
    mongoose.set('useNewUrlParser', true);
    if(process.env.MONGODB_URI) {
        mongoose.connect(process.env.MONGODB_URI);
    }
    else {
        mongoose.connect(process.env.PRE_MONGODB);
    }
    this.context = mongoose.connection;
    this.context.on('error', console.error.bind(console, 'connection error:'));
    this.context.once('open', function() {
        console.log('Connected to Mongo');
    });
    return this.context;
}

Mongo.prototype.getSchema = function (schema){
    //if (schema.constructor == Object){
    return new mongoose.Schema(schema);
    //}
}

Mongo.prototype.getSchema = function (schema, collectionName){
    if (typeof collectionName == 'string' || collectionName instanceof String) {
        return new mongoose.Schema(schema, { collection: collectionName });
    } else {
        throw new ErrorHandler.appError('collectionName variable is not a string', 501, '', false);
    }
}

Mongo.prototype.getDocumentModel = function (documentInfo){
    let mongoSchema = this.getSchema(documentInfo.schema, process.env.DB_COLLECTION);
    return this.context.model(documentInfo.name, mongoSchema);
}

Mongo.prototype.closeConnection = function (){
    this.context.disconnect();
}

module.exports = Mongo;