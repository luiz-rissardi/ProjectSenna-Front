

export interface Message {
    message: string;
    userName: string;
    userId: string;
    chatId: string;
    languages: string;
    messageType: string;
    dateSender: Date;
    messageId: string;
    status: string;
    translatedMessageText?: string;
    data?: Blob | ArrayBuffer | string;
    fileName?: string;
}
