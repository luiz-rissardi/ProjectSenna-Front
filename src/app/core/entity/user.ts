import { NotificationContext, Notification } from "../domainNotifications/notifications.js";

export class User {

    private notificationContext = new NotificationContext();
    userName: string;
    isActive: boolean;
    email: string;
    userDescription: string;
    photo: any;
    contactId: string;
    languages: string;
    lastOnline: Date;
    passwordHash: any;
    userId: string;

    constructor(
        userName = "", isActive: boolean, email: string,
        photo: Blob, userDescription: string, userId: string,
        lastOnline: Date, languages: string = null, contactId: string = null,
        password: string = "") {
        this.userName = userName;
        this.isActive = isActive;
        this.email = email;
        this.userDescription = userDescription;
        this.photo = photo;
        this.contactId = contactId;
        this.languages = languages;
        this.lastOnline = lastOnline;
        this.userId = userId;
        this.#validatePassword(password);
    }

    getNotifications(): Notification[] {
        return this.notificationContext.notificationsData
    }

    #validatePassword(password: string): void {
        const regexPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (password == null || password == undefined || String(password).trim() == "" || regexPasswordPattern.test(password) == false) {
            this.notificationContext.addNotification({
                name: "password", message:
                    `senha invalida, a senha deve conter no minimo: - 8 digitos - 1 carater especial - 1 letra maiuscula - 1 letra minuscula - 1 numero`
            });
        }
    }

    isValid(): boolean {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (this.userName == "") {
            this.notificationContext.addNotification({ name: "userName", message: "o nome do usuario esta vazio" });
        }
        if (regex.test(this.email) == false) {
            this.notificationContext.addNotification({ name: "email", message: "o email é invalido" });
        }
        if (this.languages == null) {
            this.notificationContext.addNotification({ name: "lenguages", message: "o idioma a ser escolhido esta vazio" });
        }

        return this.notificationContext.hasNotification();
    }
}