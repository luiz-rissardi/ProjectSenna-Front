import { Injectable, WritableSignal } from '@angular/core';
// import { Subject } from 'rxjs';
import { signal } from '@angular/core';

export interface UserDetail {
  show:boolean;
  data: UserDetailData
}

interface UserDetailData{
  userName:string;
  photo:string | Blob;
  description:string;
  dateOfBlocking:Date;
  userId:string;
  isActive:boolean;
  chatId:string;
}

@Injectable({
  providedIn: 'root'
})
export class UserDetailState {

  public userDetailSignal: WritableSignal<UserDetail> = signal(null);
  
  constructor() { 
  }
}

