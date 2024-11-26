import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, map, Subject, takeUntil } from "rxjs"
import { UserService } from '../../core/services/user/user.service';
import { User } from '../../shared/interfaces/user';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ContactSearchComponent } from '../shared/contact-search/contact-search.component';

@Component({
    selector: 'app-add',
    imports: [NgxSkeletonLoaderModule, ContactSearchComponent],
    templateUrl: './add.component.html',
    styleUrl: './add.component.scss'
})
export class AddComponent implements AfterViewInit, OnDestroy {

  private detroy = new Subject<void>();
  private userService = inject(UserService);
  protected filtedListUsers: User[] = [];
  private pagination = 1
  private queryText = "";
  @ViewChild("query") private queryInput!: ElementRef;
  @ViewChild("contacts") private contacts!: ElementRef;


  ngAfterViewInit(): void {
    this.changeQuery()
    this.onScrolListlEnd()
  }

  ngOnDestroy(): void {
    this.detroy.next();
    this.detroy.complete()
  }

  private onScrolListlEnd() {
    fromEvent(this.contacts.nativeElement, "scroll")
      .pipe(
        map(() => {
          const scrollPosition = this.contacts.nativeElement.scrollTop + this.contacts.nativeElement.clientHeight;
          const scrollHeight = this.contacts.nativeElement.scrollHeight;
          return scrollPosition >= scrollHeight -100;
        })
      )
      .subscribe((atBottom: boolean) => {
        if (atBottom && this.filtedListUsers.length >= 5) {
          this.pagination++;
          this.userService.getUsersByQuery(this.queryText, this.pagination)
            .subscribe((users: User[]) => {
              this.filtedListUsers.push(...users);
            })
        }
      });
  }

  private changeQuery() {
    fromEvent(this.queryInput.nativeElement, "keypress").pipe(
      debounceTime(700),
      map((e: any) => {
        const query = e.target.value;
        this.queryText = query;
        this.pagination = 0;
        this.contacts.nativeElement.scrollTop = 0;
        this.filtedListUsers.length = 0;
        this.userService.getUsersByQuery(query, this.pagination)
          .subscribe((users: User[]) => {
            this.filtedListUsers = users;
          })
      }),
      takeUntil(this.detroy)
    ).subscribe()
  }
}
