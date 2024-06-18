import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversartionsComponent } from './conversartions.component';

describe('ConversartionsComponent', () => {
  let component: ConversartionsComponent;
  let fixture: ComponentFixture<ConversartionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversartionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConversartionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
