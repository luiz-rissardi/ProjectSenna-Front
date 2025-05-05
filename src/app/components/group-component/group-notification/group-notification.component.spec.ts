import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupNotificationComponent } from './group-notification.component';

describe('GroupNotificationComponent', () => {
  let component: GroupNotificationComponent;
  let fixture: ComponentFixture<GroupNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
