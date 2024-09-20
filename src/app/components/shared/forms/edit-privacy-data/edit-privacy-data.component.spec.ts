import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrivacyDataComponent } from './edit-privacy-data.component';

describe('EditPrivacyDataComponent', () => {
  let component: EditPrivacyDataComponent;
  let fixture: ComponentFixture<EditPrivacyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPrivacyDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPrivacyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
