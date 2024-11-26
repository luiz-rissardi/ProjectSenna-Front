import { Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserState {

  public userSignal: WritableSignal<User> = signal(null);
  
}
