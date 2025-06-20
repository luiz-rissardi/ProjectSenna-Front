import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareGroupComponent } from './share-group.component';

describe('ShareGroupComponent', () => {
  let component: ShareGroupComponent;
  let fixture: ComponentFixture<ShareGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
