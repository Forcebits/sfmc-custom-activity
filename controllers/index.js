'use strict';

const NotificationLogic = rootRequire('components/WebNotification/NotificationLogic');

/*
 * GET home page.
 */
exports.index = function(req, res){
    console.log(req.session);
    NotificationLogic.getCountriesList(function(countriesList){
        const params = {
            title: process.env.ACTIVITY_NAME,
            countriesList : countriesList
        };
        
        if( !req.session || !req.session.token) {
            res.render( 'error', {
                title: 'Unauthenticated'
            });
        } else { 
            res.render('index', params);
        }

    });
    
};

exports.configActivity = function(req, res){
    const activityConfiguration = {
        "workflowApiVersion": 1.1,
        "key" : process.env.ACTIVITY_UNIQUE_NAME,
        "version": 1,
        "type": "REST",
        "lang": {
            "en-US": {
                "name": process.env.ACTIVITY_NAME,
                "description": "A custom Journey Builder activity for Web Push notifications"
            }
        },
        "metaData": {
            "icon": "images/icons8-push-notifications-40.png",
            "iconSmall": "images/icons8-push-notifications-24.png",
            "category": "message",
            "flowDisplayName": process.env.ACTIVITY_FLOW_NAME,
        },
        "arguments": {
            "execute": {
               "inArguments":[
                    {
                        "emailAddress": "{{Contact.Attribute.CustomActivity.EmailAddress}}"
                    }									
                ],
              "outArguments": [],
              "url": process.env.DOMAIN + "/JourneyActivities/" + process.env.ACTIVITY_URI + "/execute",
                "verb": "POST",
                "body": "",
                "header": "",
                "format": "json",
                "useJwt": true,
                "timeout": 10000
            }
        },
        "configurationArguments": {
            "save": {
                "url": process.env.DOMAIN + "/JourneyActivities/" + process.env.ACTIVITY_URI + "/save",
                "verb": "POST",
                "useJwt": true
                },
            "publish": {
                "url": process.env.DOMAIN + "/JourneyActivities/" + process.env.ACTIVITY_URI + "/publish",
                    "verb": "POST",
                "useJwt": true
                },
            "stop": {
                "url": process.env.DOMAIN + "/JourneyActivities/" + process.env.ACTIVITY_URI + "/stop",
                    "verb": "POST",
                "useJwt": true
            },
            "validate": {
                "url": process.env.DOMAIN + "/JourneyActivities/" + process.env.ACTIVITY_URI + "/validate",
                "verb": "POST",
                "useJwt": true
            }
        },
        "wizardSteps": [
            { "label": "Configure Activity", "key": "step1", "active": true }
        ],
        "schema": {
            "arguments": {
                "execute": {
                    "inArguments": [],
                    "outArguments": []
                }
            }
        }
    };
    res.json(activityConfiguration);
}