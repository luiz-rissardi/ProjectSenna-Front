import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, OnDestroy, signal, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, map, Subject, takeUntil } from "rxjs"
import { UserService } from '../../core/services/user/user.service';
import { User } from '../../shared/interfaces/user';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ContactSearchComponent } from '../shared/contact-search/contact-search.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-add',
    imports: [NgxSkeletonLoaderModule, ContactSearchComponent,RouterLink],
    templateUrl: './add.component.html',
    styleUrl: './add.component.scss',
    changeDetection:ChangeDetectionStrategy.Default
})
export class AddComponent implements AfterViewInit, OnDestroy {

  protected queryText = "";
  protected filtedListUsers = signal<User[]>([])
  private detroy = new Subject<void>();
  private userService = inject(UserService);
  private pagination = 1
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
        if (atBottom && this.filtedListUsers().length >= 5) {
          this.pagination++;
          this.userService.getUsersByQuery(this.queryText, this.pagination)
            .subscribe((users: User[]) => {
              this.filtedListUsers.update(data => [...data,...users])
            })
        }
      });
  }

  private changeQuery() {
    fromEvent(this.queryInput.nativeElement, "keypress").pipe(
      debounceTime(400),
      map((e: any) => {
        const query = e.target.value;
        this.queryText = query;
        this.pagination = 0;
        this.contacts.nativeElement.scrollTop = 0;
        this.filtedListUsers().length = 0;
        this.userService.getUsersByQuery(query, this.pagination)
          .subscribe((users: User[]) => {
            this.filtedListUsers.set(users)
          })
      }),
      takeUntil(this.detroy)
    ).subscribe()
  }
}
