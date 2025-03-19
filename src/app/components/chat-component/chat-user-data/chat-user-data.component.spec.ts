import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUserDataComponent } from './chat-user-data.component';

describe('ChatUserDataComponent', () => {
  let component: ChatUserDataComponent;
  let fixture: ComponentFixture<ChatUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatUserDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
