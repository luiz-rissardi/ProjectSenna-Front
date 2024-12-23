import { Injectable, signal, WritableSignal } from '@angular/core';
import { Group } from '../../../shared/interfaces/groupData';

@Injectable({
  providedIn: 'root'
})
export class GroupsState {

  public groupSignal: WritableSignal<Group[]> = signal([]);
}
