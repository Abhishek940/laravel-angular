import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionConfigrationComponent } from './inspection-configration.component';

describe('InspectionConfigrationComponent', () => {
  let component: InspectionConfigrationComponent;
  let fixture: ComponentFixture<InspectionConfigrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InspectionConfigrationComponent]
    });
    fixture = TestBed.createComponent(InspectionConfigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
