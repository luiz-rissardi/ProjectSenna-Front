import { Injectable } from '@angular/core';
import { Service } from '../base/baseService';
import { Group } from '../../../shared/interfaces/groupData';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends Service {

  constructor() {
    super();
  }

  getGroupsOfUser(userId:string){
    return this.http.get(this.uri + `/user/${userId}/group`)
  }

  createGroup(group:Partial<Group>){
    const body = this.toFormData({
      groupDescription:group.groupDescription,
      groupName:group.groupName,
      arrayBuffer:group.groupPhoto
    })
    return this.http.post(this.uri + `/group`,body);
  }

  updateGroup(group:Partial<Group>){
    const body = this.toFormData({
      groupDescription:group.groupDescription,
      groupName:group.groupName,
      arrayBuffer:group.groupPhoto
    })

    return this.http.post(this.uri + `/group/${group.chatId}`,body)
  }
}
