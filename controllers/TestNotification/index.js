'use strict';

exports.index = function(req, res){
    const params = {
        title: 'Home for testing web push notifications',
        "onesignalAppId": process.env.ONESIGNAL_ID,
    }
    res.render( 'TestNotification/index', params);
};