import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { io, Socket } from 'socket.io-client';
import { UserState } from '../../states/User/user.state';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private platformId = inject(PLATFORM_ID);
  private userState = inject(UserState);
  private socket: Socket | null = null;

  /**
   * Conecta ao servidor de WebSocket.
   * Deve ser chamado apenas no cliente (browser).
   */
  connect(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Não executa no servidor SSR
    }

    if (this.socket !== null) {
      return; // Já conectado
    }

    const userId = this.userState.userSignal()?.userId;
    if (!userId) {
      console.warn('SocketService: Cannot connect without userId');
      return;
    }

    this.socket = io("http://localhost:3000", {
      transports: ['websocket'],
      query: { userId }
    });
  }

  /**
   * Registra um listener para um evento.
   */
  on(event: string, fn: (data: any) => void): void {
    if (!this.socket) {
      console.warn('SocketService: Socket not connected. Call connect() first.');
      return;
    }
    this.socket.on(event, fn);
  }

  /**
   * Emite um evento para o servidor.
   */
  emit(event: string, data: any): void {
    if (!this.socket) {
      console.warn('SocketService: Socket not connected. Call connect() first.');
      return;
    }
    this.socket.emit(event, data);
  }

  /**
   * Desconecta do servidor e limpa recursos.
   */
  destroy(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket.io.opts.reconnection = false;
      this.socket = null;
    }
  }

  /**
   * Verifica se o socket está conectado.
   */
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}