function NotificationsDAL(){
    this.dbDocument = process.env.DB_NOTIFICATIONS_DOC;
}

Notification.prototype.setDomainURL = function(domainURL){
    this.domainURL = domainURL;
}

module.exports.NotificationsDAL = NotificationsDAL;