import { Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { ButtonStyleDirective } from '../../../../directives/buttonStyle/button-style.directive';
import { fromEvent, map, Subject, takeUntil } from 'rxjs';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { GroupFacade } from '../../../../facades/group/group.facade';

@Component({
  selector: 'app-create-group',
  imports: [ButtonStyleDirective, ReactiveFormsModule],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.scss'
})
export class CreateGroupComponent implements OnDestroy {

  private elRef = inject(ElementRef);
  private groupFacade = inject(GroupFacade);
  private inputPhoto: HTMLInputElement;
  private detroy = new Subject<void>();
  protected groupForm: FormGroup;
  protected groupNameInvalid = false;
  protected chosenImage: any = "../../../../assets/icons/do-utilizador.png";
  protected chosenImageBlob:Blob;

  @ViewChild("buttonImage") private buttonImage: ElementRef<any>;

  constructor(formBuilder: FormBuilder) {
    this.groupForm = formBuilder.group({
      groupDescription: [],
      groupName: []
    })
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

  createGroup() {
    const [groupDescription,groupName] = ["groupDescription","groupName"].map((el, index) => {
      return this.groupForm.get(el).value;
    })

    if(groupName?.trim() == ""){
      this.groupNameInvalid = true;
    }else{
      this.groupNameInvalid = false;
      this.groupFacade.createGroup(groupName,groupDescription,this.chosenImageBlob)
    }
  }

  loadAlternativeImage() {
    this.buttonImage.nativeElement.src = "../../../../assets/icons/do-utilizador.png"
  }
}
