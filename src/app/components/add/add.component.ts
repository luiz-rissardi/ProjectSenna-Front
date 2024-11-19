import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, map, Subject, takeUntil } from "rxjs"
import { UserService } from '../../core/services/User/user.service';
import { User } from '../../core/entity/user';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ContactSearchComponent } from '../shared/contact-search/contact-search.component';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [NgxSkeletonLoaderModule,ContactSearchComponent],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent implements AfterViewInit, OnDestroy {

  @ViewChild("query") private queryInput!: ElementRef;
  private detroy = new Subject<void>();
  private userService = inject(UserService);
  protected filtedListUsers: User[] = [];


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
        this.userService.getUsersByQuery(query)
        .subscribe((users:User[]) => {
          this.filtedListUsers.length = 0;
          this.filtedListUsers = users;
        })
      }),
      takeUntil(this.detroy)
    ).subscribe()
  }
}
