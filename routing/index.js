'use strict';

const express    = require('express');
const ctr        = rootRequire('controllers');
const ctrTestNotification      = rootRequire('controllers/TestNotification');
const ctrWebPushNotifications  = rootRequire('controllers/JourneyActivities/WebPushNotifications');

const router     = express.Router();

//--------JourneyActivities----------

//WebPushNotifications API
router.post('/JourneyActivities/WebPushNotifications/save/', ctrWebPushNotifications.save);
router.post('/JourneyActivities/WebPushNotifications/validate/', ctrWebPushNotifications.validate);
router.post('/JourneyActivities/WebPushNotifications/publish/', ctrWebPushNotifications.publish);
router.post('/JourneyActivities/WebPushNotifications/execute/', ctrWebPushNotifications.execute);
router.get('/JourneyActivities/WebPushNotifications', ctrWebPushNotifications.index);

//TestNotification
router.post('/TestNotification/sendNotification/', ctrTestNotification.sendNotification);
router.get('/TestNotification/getNotifications/', ctrTestNotification.getNotifications);
router.get('/TestNotification', ctrTestNotification.index);

//Home
router.get('/config.json', ctr.configActivity);
router.get('/|index|index.html', ctr.index);


module.exports = router;