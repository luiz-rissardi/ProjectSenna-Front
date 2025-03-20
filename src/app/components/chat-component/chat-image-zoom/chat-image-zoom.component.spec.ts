import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatImageZoomComponent } from './chat-image-zoom.component';

describe('ChatImageZoomComponent', () => {
  let component: ChatImageZoomComponent;
  let fixture: ComponentFixture<ChatImageZoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatImageZoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatImageZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
