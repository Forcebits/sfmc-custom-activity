'use strict';

const express    = require('express');
const ctr        = rootRequire('controllers');
const ctrTestNotification      = rootRequire('controllers/TestNotification');
const ctrWebPushNotifications  = rootRequire('controllers/JourneyActivities/WebPushNotifications');

const router     = express.Router();

//TestNotification
router.get('/TestNotification', ctrTestNotification.index);

//Home
router.get('/config.json', ctr.configActivity);
router.get('/|index|index.html', ctr.index);



//--------JourneyActivities----------

//WebPushNotifications API
router.get('/JourneyActivities/WebPushNotifications', ctrWebPushNotifications.index);
router.post('/JourneyActivities/WebPushNotifications/save/', ctrWebPushNotifications.save);
router.post('/JourneyActivities/WebPushNotifications/validate/', ctrWebPushNotifications.validate);
router.post('/JourneyActivities/WebPushNotifications/publish/', ctrWebPushNotifications.publish);
router.post('/JourneyActivities/WebPushNotifications/execute/', ctrWebPushNotifications.execute);

module.exports = router;