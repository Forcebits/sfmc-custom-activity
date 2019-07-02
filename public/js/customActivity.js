'use strict';

var connection = new Postmonger.Session();
var authTokens = {};
var payload = {};
window.onload = function() {
    onRender();
};
//document.addEventListener('DOMContentLoaded', onRender);

connection.on('initActivity', init);
connection.on('requestedTokens', onGetTokens);
connection.on('requestedEndpoints', onGetEndpoints);

connection.on('clickedNext', save);

function onRender() {
    console.log('rendering');
    // JB will respond the first time 'ready' is called with 'initActivity'
    connection.trigger('ready');
    connection.trigger('requestTokens');
    connection.trigger('requestEndpoints');
}

function init(data) {
    console.log('init', data);
    if (data) {
        payload = data;
    }
    
    var hasInArguments = Boolean(
        payload['arguments'] &&
        payload['arguments'].execute &&
        payload['arguments'].execute.inArguments &&
        payload['arguments'].execute.inArguments.length > 0
    );

    var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

    console.log(inArguments);

    $.each(inArguments, function (index, inArgument) {
        $.each(inArgument, function (key, val) {
            
            console.log(key, val);
        });
    });

    connection.trigger('updateButton', {
        button: 'next',
        text: 'done',
        visible: true
    });
}

function onGetTokens(tokens) {
    console.log(tokens);
    authTokens = tokens;
}

function onGetEndpoints(endpoints) {
    console.log(endpoints);
}

function save() {
    console.log('save method');

    payload['arguments'].execute.inArguments = [{
        "tokens": authTokens,
        "emailAddress": "{{Contact.Attribute.EmailAddress}}"
    }];
    
    payload['metaData'].isConfigured = true;

    console.log(payload);
    connection.trigger('updateActivity', payload);
}