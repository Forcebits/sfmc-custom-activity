function Notification(title, content){
    let notification = Object.create(Notification.prototype);
    notification.title = title;
    notification.content = content;
    notification.domainURL;
    notification.iconURL;
    return notification;
}

Notification.prototype.setDomainURL = function(domainURL){
    this.domainURL = domainURL;
}

Notification.prototype.setIcon = function(iconURL){
    this.iconURL = iconURL;
}

Notification.prototype.ToDictionary = function(){
    let dict = Object.keys(this).reduce((result, key) => {
        result[key] = this[key];
        return result;
    }, {});

    return dict;
}

module.exports = Notification;