

export interface Message {
    message: string;
    userName: string;
    userId: string;
    chatId: string;
    originLanguage: string;
    messageType: string;
    dateSender: Date;
    messageId: string;
    status: string;
    translatedMessageText?: string;
}

export interface MessageFile {
    data: Blob;
    fileName: string;
    messageId: string
}