
export class Notification {
    name: string;
    message: string;

    constructor(name: string, message: string) {
        this.name = name;
        this.message = message
    }
}

export class NotificationContext {

    notificationsData: Notification[] = [];


    addNotification(notification: Notification) {
        this.notificationsData.push(
            new Notification(notification.name, notification.message)
        );
    }

    hasNotification(): boolean {
        return this.notificationsData.length == 0;
    }
}