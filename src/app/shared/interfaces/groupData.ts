
export interface Group {

    chatId: string;
    groupName: string;
    groupDescription: string;
    groupPhoto: Blob | string | any;
    dateOfBlocking: Date | undefined;
    isActive: boolean;
    lastClear: Date | undefined;
    memberType: string

}