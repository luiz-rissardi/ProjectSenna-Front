import { Injectable, signal, WritableSignal } from '@angular/core';
import { Warning } from '../../../shared/interfaces/ResponseType';

@Injectable({
  providedIn: 'root'
})
export class WarningState {

  public warnigSignal: WritableSignal<Warning> = signal(null);
  
}
