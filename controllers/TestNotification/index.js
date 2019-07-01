'use strict';

const NotificationLogic = rootRequire('components/WebNotification/NotificationLogic');

exports.index = function(req, res){
    const params = {
        title: 'Test Web Push Notifications',
        "onesignalAppId": process.env.ONESIGNAL_ID,
    }
    res.render( 'TestNotification/index', params);
};

exports.sendNotification = function(req, res){
    NotificationLogic.sendWebPushNotification();
    res.sendStatus(200);
}

exports.getNotifications = function(req, res){
    NotificationLogic.getPushNotifications(function(notificationsSent){
        res.json({data : notificationsSent});
    });
}