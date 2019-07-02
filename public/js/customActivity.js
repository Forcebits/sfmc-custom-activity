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

connection.on('clickedNext', onClickedNext);
connection.on('clickedBack', onClickedBack);
connection.on('gotoStep', onGotoStep);

function onRender() {
    console.log('rendering');
    // JB will respond the first time 'ready' is called with 'initActivity'
    connection.trigger('ready');
    connection.trigger('requestTokens');
    connection.trigger('requestEndpoints');

    var checkedValues = document.querySelectorAll('.selectedCountries:checked');
    if (checkedValues && checkedValues.length > 0){
        console.log('checkedValues', checkedValues);
        checkedValues.forEach(elem => {
            elem.addEventListener("change", function() {
                console.log('eventListener');
                if (getCountries()){                    
                    connection.trigger('updateButton', { button: 'next', enabled: true });
                } else {
                    connection.trigger('updateButton', { button: 'next', enabled: false });
                }
              });
        });
    }
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
        "tokens": authTokens
    }];
    
    payload['metaData'].isConfigured = true;

    console.log(payload);
    connection.trigger('updateActivity', payload);
}

function onClickedNext () {
    console.log('onClickedNext');
    if (
        (currentStep.key === 'step2' && steps[2].active === false) ||
        currentStep.key === 'step3'
    ) {
        save();
    } else {
        connection.trigger('nextStep');
    }
}

function onClickedBack () {
    console.log('onClickedBack');
    connection.trigger('prevStep');
}

function onGotoStep (step) {
    console.log('onGotoStep');
    showStep(step);
    connection.trigger('ready');
}

function showStep(step, stepIndex) {
    console.log('showStep');
    if (stepIndex && !step) {
        step = steps[stepIndex-1];
    }

    currentStep = step;

    hideElements('.step');

    switch(currentStep.key) {
        case 'step1':
            showElements('#step1');
            connection.trigger('updateButton', {
                button: 'next',
                enabled: Boolean(getCountries())
            });
            connection.trigger('updateButton', {
                button: 'back',
                visible: false
            });
            break;
        case 'step2':
            showElements('#step2');
            connection.trigger('updateButton', {
                button: 'back',
                visible: true
            });
            connection.trigger('updateButton', {
                button: 'next',
                text: 'next',
                visible: true
            });
            break;
        case 'step3':
            showElements('#step3');
            break;
    }
}

function getCountries(){
    var checkedValues = document.querySelectorAll('.selectedCountries:checked');
    if (checkedValues && checkedValues.length > 0){
        return checkedValues;
    } else return false;
}

function showElements(selector){
    var results = document.querySelectorAll(selector);
    results.forEach(elem => {
        elem.style.display = "block";
    });
}

function hideElements(selector){
    var results = document.querySelectorAll(selector);
    results.forEach(elem => {
        elem.style.display = "none";
    });
}