

export interface Message {
    message: string;
    userName: string;
    userId: string;
    chatId: string;
    language: string;
    messageType: string;
    dateSender: Date;
    messageId: string;
    status: string;
    translatedMessageText?: string;
}

export interface MessageFile {
    data: Blob | ArrayBuffer | string;
    fileName: string;
    messageId: string
}