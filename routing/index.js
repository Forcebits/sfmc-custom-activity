'use strict';

const express    = require('express');
const ctr        = rootRequire('controllers');
const ctrWebPushNotifications  = rootRequire('controllers/JourneyActivities/WebPushNotifications');

const router     = express.Router();

router.get('/', ctr.index);

router.get('/JourneyActivities/WebPushNotifications', ctrWebPushNotifications.index);
router.get('/JourneyActivities/WebPushNotifications/save/', ctrWebPushNotifications.save);
router.get('/JourneyActivities/WebPushNotifications/validate/', ctrWebPushNotifications.validate);
router.get('/JourneyActivities/WebPushNotifications/publish/', ctrWebPushNotifications.publish);
router.get('/JourneyActivities/WebPushNotifications/execute/', ctrWebPushNotifications.execute);

module.exports = router;