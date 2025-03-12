import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, fromEvent, takeUntil } from 'rxjs';
import { GroupFacade } from '../../../../facades/group/group.facade';
import { ButtonStyleDirective } from '../../../../directives/buttonStyle/button-style.directive';
import { ChatState } from '../../../../core/states/chat/chat.state';
import { GroupsState } from '../../../../core/states/groups/groups.state';
import { Group } from '../../../../shared/interfaces/groupData';

@Component({
  selector: 'app-edit-group',
  imports: [ButtonStyleDirective, ReactiveFormsModule],
  templateUrl: './edit-group.component.html',
  styleUrl: './edit-group.component.scss'
})
export class EditGroupComponent {
  private elRef = inject(ElementRef);
  private groupFacade = inject(GroupFacade);
  private chatState = inject(ChatState);
  private groupsState = inject(GroupsState);
  private inputPhoto: HTMLInputElement;
  private detroy = new Subject<void>();
  protected groupForm: FormGroup;
  protected groupNameInvalid = false;
  protected chosenImage: any = "../../../../assets/icons/do-utilizador.png";
  protected chosenImageBlob: Blob;

  constructor(formBuilder: FormBuilder) {
    this.groupForm = formBuilder.group({
      groupDescription: [],
      groupName: []
    })

    const group:Group = this.groupsState.groupSignal().filter(group => group.chatId == this.chatState.chatState().chatId)[0];
    this.groupForm.get("groupDescription").setValue(group.groupDescription);
    this.groupForm.get("groupName").setValue(group.groupName);
  }

  ngOnDestroy(): void {
    this.detroy.next();
    this.detroy.complete()
  }

  protected async changePhoto() {
    this.inputPhoto = this.elRef.nativeElement.querySelector('#inputFoto') as HTMLInputElement;
    this.inputPhoto.click();

    fromEvent(this.inputPhoto, "change").pipe(
      map(e => {
        const file = this.inputPhoto.files[0];
        if (file) {
          this.chosenImageBlob = new Blob([file])
          this.chosenImage = URL.createObjectURL(this.chosenImageBlob);
        }
      }),
      takeUntil(this.detroy)
    ).subscribe()
  }

  protected editGroup() {
    const [groupDescription, groupName] = ["groupDescription", "groupName"].map((el, index) => {
      return this.groupForm.get(el).value;
    })

    if (groupName?.trim() == "") {
      this.groupNameInvalid = true;
    } else {
      this.groupNameInvalid = false;
      this.groupFacade.updateGroup(this.chatState.chatState().chatId,groupName, groupDescription, this.chosenImageBlob)
    }
  }

  loadAlternativeImage() {
    this.chosenImage.nativeElement.src = "../../../../assets/icons/do-utilizador.png"
  }
}

