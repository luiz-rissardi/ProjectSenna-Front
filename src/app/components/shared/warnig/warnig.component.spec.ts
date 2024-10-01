import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnigComponent } from './warnig.component';

describe('WarnigComponent', () => {
  let component: WarnigComponent;
  let fixture: ComponentFixture<WarnigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarnigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarnigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
