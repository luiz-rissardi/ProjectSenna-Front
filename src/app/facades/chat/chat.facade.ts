import { inject, Injectable } from '@angular/core';
import { WarningState } from '../../core/states/warning/warning.state';
import { ChatService } from '../../core/services/chat/chat.service';
import { ResponseHttp } from '../../shared/interfaces/ResponseType';
import { ChatData } from '../../shared/interfaces/chatData';
import { ChatArrayState } from '../../core/states/chats/chats.state';
import { Chat } from '../../shared/interfaces/chat';
import { forkJoin } from 'rxjs';
import { User } from '../../shared/interfaces/user';
import { ChatState } from '../../core/states/chat/chat.state';
import { UserDetailState } from '../../core/states/userDetail/user-detail.state';

@Injectable({
  providedIn: 'root'
})
export class ChatFacade {

  private warningState = inject(WarningState);
  private chatService = inject(ChatService);

  private chatArrayState = inject(ChatArrayState);
  private chatDataState = inject(ChatState);
  private userDetailState = inject(UserDetailState)

  getChatsOfUser(userId: string) {
    try {
      this.chatService.getChats(userId)
        .subscribe((result: ResponseHttp<ChatData[]>) => {
          if (result.isSuccess) {
            this.chatArrayState.chatsArrayState.set(result.value);
          } else {
            this.warningState.warnigSignal.set({ IsSucess: false, data: { message: "Cannot get chats" } })
          }
        })
    } catch (error) {
      this.warningState.warnigSignal.set({ IsSucess: false, data: { message: "Cannot get chats" } })
    }
  }

  blockChat(userId: string, chatId: string) {
    try {
      const currentUserDetail = this.userDetailState.userDetailSignal();
      this.userDetailState.userDetailSignal.set({
        show: false,
        data: {
          ...currentUserDetail.data,
          isActive: false,
          dateOfBlocking: new Date(),
        },
      });

      // Atualiza o estado do chat
      const currentChatState = this.chatDataState.chatState();
      this.chatDataState.chatState.set({
        ...currentChatState,
        isActive: false,
      });

      this.chatArrayState.chatsArrayState.update(chats => {
        chats = chats.map(el => {
          if (el.otherUserId == this.userDetailState.userDetailSignal().data.userId) {
            el.isActive = false;
            el.dateOfBlocking = new Date();
          }
          return el
        })
        return chats
      })


      this.chatService.blockChat(chatId, userId)
        .subscribe((result: ResponseHttp<any>) => {
          if (result.isSuccess) {
            this.warningState.warnigSignal.set({ IsSucess: true, data: { message: "chat locking" } })
          } else {
            this.warningState.warnigSignal.set({ IsSucess: false, data: { message: "error occurred locking the chat" } })
          }
        })
    } catch (error) {
      this.warningState.warnigSignal.set({ IsSucess: false, data: { message: "error occurred locking the chat" } })
    }
  }

  deblockChat(userId: string, chatId: string) {
    try {
      // atualiza o estdado do chat perante o usuario
      const currentUserDetail = this.userDetailState.userDetailSignal();
      this.userDetailState.userDetailSignal.set({
        show: false,
        data: {
          ...currentUserDetail.data,
          isActive: true,
          dateOfBlocking: null,
        },
      });

      // Atualiza o estado do chat
      const currentChatState = this.chatDataState.chatState();
      this.chatDataState.chatState.set({
        ...currentChatState,
        isActive: true,
      });

      this.chatArrayState.chatsArrayState.update(chats => {
        chats = chats.map(el => {
          if (el.otherUserId == this.userDetailState.userDetailSignal().data.userId) {
            el.isActive = true;
            el.dateOfBlocking = null;
          }
          return el
        })
        return chats
      })

      this.chatService.desblockChat(chatId, userId)
        .subscribe((result: ResponseHttp<any>) => {
          if (result.isSuccess) {
            this.warningState.warnigSignal.set({ IsSucess: true, data: { message: "chat unlocking" } })
          } else {
            this.warningState.warnigSignal.set({ IsSucess: false, data: { message: "error occurred unlocking the chat" } })
          }
        })
    } catch (error) {
      this.warningState.warnigSignal.set({ IsSucess: false, data: { message: "error occurred unlocking the chat" } })
    }
  }

  createNewChat(currentUserId: string, targetUser: Partial<User>) {
    try {
      this.chatService.createNewChat()
        .subscribe((result: ResponseHttp<Chat>) => {
          if (result.isSuccess == true) {
            const chat = result.value
            forkJoin(
              [
                this.chatService.addUsersInChat(chat.chatId, currentUserId),
                this.chatService.addUsersInChat(chat.chatId, targetUser.userId)
              ]).subscribe((results: [ResponseHttp<ChatData>, ResponseHttp<ChatData>]) => {
                const obj: ChatData = {
                  memberType: results[0].value.memberType,
                  lastClear: results[0].value.lastClear,
                  isActive: results[0].value.isActive,
                  userId: currentUserId,
                  chatId: chat.chatId,
                  dateOfBlocking: results[0].value.dateOfBlocking,
                  otherUserId: targetUser.userId,
                  otherUserName: targetUser.userName,
                  otherUserDescription: targetUser.userDescription,
                  otherUserPhoto: targetUser.photo,
                  otherUserLastOnline: targetUser.lastOnline
                }
                const finalyResults = results.filter(el => el.isSuccess == true);
                if (finalyResults.length > 0) {
                  this.chatArrayState.chatsArrayState.update((chats: ChatData[]) => {
                    chats?.push(obj)
                    return chats
                  })
                  this.warningState.warnigSignal.set({ IsSucess: true, data: { message: "Chat Criado com sucesso!" } })
                }
              })
          } else {
            this.warningState.warnigSignal.set({ IsSucess: false, data: result.error })
          }
        })
    } catch (error) {
      this.warningState.warnigSignal.set({ IsSucess: false, data: { message: "error occurred in creation of chat" } })
    }
  }
}
