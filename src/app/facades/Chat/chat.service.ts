import { inject, Injectable } from '@angular/core';
import { WarningState } from '../../core/states/warning/warning.service';
import { ChatService } from '../../core/services/Chat/chat.service';
import { ResponseHttp } from '../../interfaces/ResponseType';
import { ChatData } from '../../core/entity/chatData';
import { ChatArrayState } from '../../core/states/Chats/chats.service';
import { Chat } from '../../core/entity/chat';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatFacade {

  private warningState = inject(WarningState);
  private chatService = inject(ChatService);
  private chatArrayState = inject(ChatArrayState);

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

  createNewChat(currentUserId: string, targetUserId: string) {
    try {
      this.chatService.createNewChat()
        .subscribe((result: ResponseHttp<Chat>) => {
          if (result.isSuccess == true) {
            const chat = result.value
            forkJoin(
              [
                this.chatService.addUsersInChat(chat.chatId, currentUserId),
                this.chatService.addUsersInChat(chat.chatId, targetUserId)
              ]).subscribe((results:[ResponseHttp<ChatData>, ResponseHttp<ChatData>]) => {
                const finalyResults = results.filter(el => el.isSuccess == true);
                if(finalyResults.length > 0){
                  this.warningState.warnigSignal.set({ IsSucess: true, data: {message:"Chat Criado com sucesso!"} })
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
