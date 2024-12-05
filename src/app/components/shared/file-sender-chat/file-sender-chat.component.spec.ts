import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSenderChatComponent } from './file-sender-chat.component';

describe('FileSenderChatComponent', () => {
  let component: FileSenderChatComponent;
  let fixture: ComponentFixture<FileSenderChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileSenderChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileSenderChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
