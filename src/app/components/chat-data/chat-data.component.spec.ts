import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDataComponent } from './chat-data.component';

describe('ChatDataComponent', () => {
  let component: ChatDataComponent;
  let fixture: ComponentFixture<ChatDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
