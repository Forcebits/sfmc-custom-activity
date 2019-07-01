'use strict';

var Onesignal = require('onesignal-node');
var request = require('request')


function getOnesignalClient(){
    let myClient = new Onesignal.Client({      
        userAuthKey: process.env.ONESIGNAL_USER_AUTH_KEY,      
        app: { appAuthKey: process.env.ONESIGNAL_APP_AUTH_KEY, appId: process.env.ONESIGNAL_ID }      
    });
    return myClient;
}

function sendWebPushNotification(){
    const myClient = getOnesignalClient();
    let headings = {
        en: "Hi from the APP!",      
        es: "Hola desde la app!"  
    };
    let contents = {
        en: "This is a test notification :)",      
        es: "Esto es una notificación de prueba :)" 
    }
    var osNotification = new Onesignal.Notification({});   
    osNotification.postBody["contents"] = contents;
    osNotification.postBody["headings"] = headings;
    osNotification.postBody["included_segments"] = ["Active Users"];
    myClient.sendNotification(osNotification)
        .then(function (response) {      
            console.log(response.data, response.httpResponse.statusCode);      
        })      
        .catch(function (err) {      
            console.log('Notification logic | sendWebPushNotification | Something went wrong...');      
        });    
}
module.exports.sendWebPushNotification = sendWebPushNotification;


function getPushNotifications(callback){
    const myClient = getOnesignalClient();
    myClient.viewNotifications('limit=30', function (err, httpResponse, data) {      
        if (httpResponse.statusCode === 200 && !err) {   
            let parsedData = JSON.parse(data);
            let osNotifications = parsedData.notifications;
            let res = new Array();
            osNotifications.forEach(function(osNotification){
                let resItem = {};
                resItem.id = osNotification.id;
                resItem.headings = osNotification.headings;
                resItem.contents = osNotification.contents;
                resItem.platform_delivery_stats = osNotification.platform_delivery_stats;
                resItem.delivery_time_of_day = osNotification.delivery_time_of_day;
                res.push(resItem);
            });
            return callback(res);
        }
    });
}
module.exports.getPushNotifications = getPushNotifications;


function getCountriesList(callback){
    const url = process.env.COUNTRIES_LIST_URL;
    let defaultCountries = process.env.DEFAULT_COUNTRY_CODES;
    const defaultCountriesList = defaultCountries.split(',');
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let countriesList = new Array();
            body.forEach(function (item, index){
                let country = {
                    name : String(item.name),
                    code : String(item.code),
                    checked : false
                };
                if (defaultCountriesList.includes(country.code)){
                    country.checked = true;
                    countriesList.unshift(country);
                } else {
                    countriesList.push(country);
                }
            });
            return callback(countriesList);
        }
    })
}
module.exports.getCountriesList = getCountriesList;