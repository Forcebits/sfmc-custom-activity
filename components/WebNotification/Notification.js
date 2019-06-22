function Notification(title, content){
    let notification = Object.create(Notification.prototype);
    notification.title = title;
    notification.content = content;
    return notification;
}

Notification.prototype.setDomainURL = function(domainURL){
    this.domainURL = domainURL;
}

Notification.prototype.setIcon = function(iconURL){
    this.iconURL = iconURL;
}

module.exports.Notification = Notification;