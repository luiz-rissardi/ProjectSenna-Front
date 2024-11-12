import { NotificationContext } from "../domainNotifications/notifications.js"


export class Chat {

    #notificationContext = new NotificationContext();
    chatId: any;
    chatType: any;

    constructor(chatId:string,chatType:string){
        this.chatId = chatId;
        this.chatType = chatType;
    }

    getNotifications(){
        return this.#notificationContext.notificationsData
    }

    isValid(){
        const typesOfChat = ["group","conversation"]
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if(this.chatId == undefined || uuidRegex.test(this.chatId) == false){
            this.#notificationContext.addNotification({ name: "chatId", message: "o chatId é iválido" })
        }

        if(!typesOfChat.includes(this.chatType)){
            this.#notificationContext.addNotification({ name: "chatType", message: "tipo de chat invalido" })
        }

        return this.#notificationContext.hasNotification()
    }
}