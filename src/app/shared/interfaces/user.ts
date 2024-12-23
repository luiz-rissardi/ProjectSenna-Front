
export interface User {
    userName: string;
    isActive: boolean;
    email: string;
    userDescription: string;
    photo: any ;
    contactId: string;
    languages: string;
    lastOnline: Date;
    passwordHash: any;
    userId: string;
    readMessages: boolean;
    password?:string;
}