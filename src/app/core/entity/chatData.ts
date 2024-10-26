

export interface ChatData {
    memberType: string,
    lastClear: Date,
    isActive: string,
    userId: string,
    chatId: string,
    dateOfBlocking: Date,
    otherUserId: string,
    otherUserName: string,
    otherUserDescription: string,
    otherUserPhoto: Blob,
    otherUserLastOnline: Date
}