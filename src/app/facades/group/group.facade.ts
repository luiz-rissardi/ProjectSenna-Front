import { inject, Injectable } from '@angular/core';
import { GroupService } from '../../core/services/group/group.service';
import { WarningState } from '../../core/states/warning/warning.state';
import { Group } from '../../shared/interfaces/groupData';
import { ResponseHttp } from '../../shared/interfaces/ResponseType';
import { GroupsState } from '../../core/states/groups/groups.state';
import { ChatService } from '../../core/services/chat/chat.service';
import { UserState } from '../../core/states/User/user.state';
import { ChatData } from '../../shared/interfaces/chatData';

@Injectable({
  providedIn: 'root'
})
export class GroupFacade {

  private groupService = inject(GroupService);
  private chatService = inject(ChatService);
  private warningState = inject(WarningState);
  private userState = inject(UserState);
  private groupArrayState = inject(GroupsState);
  private groupState = inject(GroupsState);

  getGroups(userId: string) {
    try {
      this.groupService.getGroupsOfUser(userId)
        .subscribe((result: ResponseHttp<Group[]>) => {
          this.groupState.groupSignal.set(null);
          this.groupState.groupSignal.set(result.value);
        })
    } catch (error) {
      this.warningState.warnigSignal.set({
        IsSucess: false,
        data: { message: "It was not possible find groups" }
      })
    }
  }

  createGroup(groupName: string, groupDescription: string, groupPhoto: Blob | string) {
    try {
      const group: Partial<Group> = {
        groupName,
        groupDescription,
        groupPhoto,
        lastClear: null,
        dateOfBlocking: null,
        memberType: "master",
        isActive: true
      }

      this.groupService.createGroup(group)
        .subscribe((resultGroup: ResponseHttp<Group>) => {
          if (resultGroup.isSuccess) {
            this.chatService.addUsersInChat(resultGroup.value.chatId, this.userState.userSignal().userId, "master")
              .subscribe((result: ResponseHttp<ChatData>) => {
                if (result.isSuccess) {
                  this.groupArrayState.groupSignal.update((groups: Group[]) => {
                    groups?.push({
                      ...resultGroup.value,
                      groupPhoto,
                      ...group
                    })
                    return groups
                  })
                  this.warningState.warnigSignal.set({ IsSucess: true, data: { message: "Chat created successfully!" } })
                }
              })
          } else {
            this.warningState.warnigSignal.set({
              IsSucess: false,
              data: { message: "an error occurred while creating a group" }
            })
          }
        })

    } catch (error) {
      this.warningState.warnigSignal.set({
        IsSucess: false,
        data: { message: "an error occurred while creating a group" }
      })
    }
  }

  updateGroup(chatId: string, groupName: string, groupDescription: string, groupPhoto: Blob | string) {
    try {
      this.groupService.updateGroup({ chatId, groupName, groupDescription, groupPhoto })
        .subscribe((resultGroup: ResponseHttp<Group>) => {
          if (resultGroup.isSuccess) {
            this.groupArrayState.groupSignal.update((groups: Group[]) => {
              const updatedGroups = groups.map(el => {
                if (el.chatId == chatId) {
                  el.groupPhoto = groupPhoto;
                  el.groupName = groupName;
                  el.groupDescription = groupDescription;
                }
                return el
              })
              return updatedGroups
            })

            this.warningState.warnigSignal.set({
              IsSucess: true,
              data: { message: "group updated successfully" }
            })

          } else {
            this.warningState.warnigSignal.set({
              IsSucess: false,
              data: { message: "an error occurred while update the group" }
            })
          }
        })

    } catch (error) {
      this.warningState.warnigSignal.set({
        IsSucess: false,
        data: { message: "an error occurred while creating a group" }
      })
    }
  }

}
