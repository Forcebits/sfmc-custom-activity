const ErrorHandler = rootRequire('utils').ErrorHandler;
const ArraysUtil = rootRequire('utils').ArraysUtil;
const Mongo = rootRequire('model/MongoODM');
const DocumentInfo = rootRequire('model/DocumentInfo');
const Notification = rootRequire('components/WebNotification/Notification');
const NotificationScheme = rootRequire('components/WebNotification/NotificationScheme');

function NotificationsDAL(){
    let notificationsDAL = Object.create(NotificationsDAL.prototype);
    notificationsDAL.db = new Mongo();
    notificationsDAL.db.getConnection();
    notificationsDAL.documentInfo = Object.create(DocumentInfo.prototype);
    notificationsDAL.documentInfo.name = process.env.DB_NOTIFICATION_DOC;
    notificationsDAL.documentInfo.schema = NotificationScheme();
    notificationsDAL.Model = notificationsDAL.db.getDocumentModel(notificationsDAL.documentInfo);
    return notificationsDAL;
}

NotificationsDAL.prototype.create = function(notification){
    if (notification instanceof Notification){
        let dbNotification = new this.Model(notification.ToDictionary());
        dbNotification.save(function (err) {
            if (err) return handleError(err);
            console.log('notificación guardada');
        });          
    } else {
        throw new ErrorHandler.appError('notification variable is not of the type Notification', 501, '', false);
    }
}

NotificationsDAL.prototype.createFromArray = function(notifications){
    if (typeof notifications === 'object' && notifications.constructor === Array && ArraysUtil.validateTypeOfElements(notifications, Notification)){
        let dbNotificationsArray = notifications.map(n => n.ToDictionary());
        this.Model.collection.insertMany(dbNotificationsArray, function (err, docs) {
            if (err){ 
                return console.error(err);
            } else {
                console.log("Multiple documents inserted to Collection");
            }
        });
    }
}

module.exports = NotificationsDAL;