import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, map, Subject, takeUntil } from "rxjs"

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements AfterViewInit, OnDestroy {

  @ViewChild("query") private queryInput!: ElementRef;
  private detroy = new Subject<void>();


  ngAfterViewInit(): void {
    this.changeQuery()
  }

  ngOnDestroy(): void {
    this.detroy.next();
    this.detroy.complete()
  }

  private changeQuery() {
    fromEvent(this.queryInput.nativeElement, "keyup").pipe(
      debounceTime(700),
      map((e: any) => {
        const query = e.target.value;
        
      }),
      takeUntil(this.detroy)
    ).subscribe()
  }
}
