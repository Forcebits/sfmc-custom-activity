const notification = rootRequire('components/WebNotification/Notification');
const notificationsDAL = rootRequire('components/WebNotification/NotificationsDAL');
const test = rootRequire('components/WebNotification/Test').Test;

module.exports.WebNotifications = function() {
    this.Notification = notification;
    this.NotificationsDAL = notificationsDAL;
    this.Test = test;
}