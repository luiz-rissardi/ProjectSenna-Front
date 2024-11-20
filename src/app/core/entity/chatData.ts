

export interface ChatData {
    memberType: string,
    lastClear: Date,
    isActive: boolean,
    userId: string,
    chatId: string,
    dateOfBlocking: Date,
    otherUserId: string,
    otherUserName: string,
    otherUserDescription: string,
    otherUserPhoto: Blob | string,
    otherUserLastOnline: Date
}