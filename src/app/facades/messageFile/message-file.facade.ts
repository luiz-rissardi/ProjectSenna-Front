import { inject, Injectable } from '@angular/core';
import { MessageFileService } from '../../core/services/messageFile/message-file.service';
import { WarningState } from '../../core/states/warning/warning.state';
import { MessageFile } from '../../shared/interfaces/message';
import { ResponseHttp } from '../../shared/interfaces/ResponseType';

@Injectable({
  providedIn: 'root'
})
export class MessageFileFacade {

  private messageFileService = inject(MessageFileService);
  private warningState = inject(WarningState);

  



}
