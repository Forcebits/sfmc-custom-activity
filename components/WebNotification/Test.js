const webNotification = rootRequire('components/WebNotification');
const Notification = rootRequire('components/WebNotification/Notification');
const NotificationsDAL = rootRequire('components/WebNotification/NotificationsDAL');

function Test2(){
    let test = Object.create(Test2.prototype);
    console.log('test object');
    return test;
}

Test2.prototype.run = function (){
    console.log('running test');

    var notification = new Notification();

    notification.title = 'test';
    notification.content = 'esto es una desc';

    var notificationDal = new NotificationsDAL();

    notificationDal.create(notification);
    
    let notifArr = new Array();
    for (var x = 2; x < 5; x++){
        var notif = new Notification();
        notif.title = 'test' + x;
        notif.content = 'esto es una desc ' + x;
        notifArr.push(notif);
    }
    notificationDal.createFromArray(notifArr);
}

module.exports.Test = Test2;