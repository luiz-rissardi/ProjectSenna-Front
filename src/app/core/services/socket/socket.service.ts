import { inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { UserState } from '../../states/User/user.state';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private userState = inject(UserState)
  private socket: Socket = null;

  constructor() {
    if (this.socket == null) {
      this.socket = io("http://localhost:3000", {
        transports: ['websocket'],
        query: {
          userId: this.userState.userSignal().userId
        }
      });
    }
    return this;
  }


  on(event: string, fn: Function) {
    this.socket.on(event, (data) => {
      fn(data)
    })
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  destroy() {
    this.socket.disconnect()
    this.socket.io.opts.reconnection = false;
  }


}
