import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSummerVacationInspectionComponent } from './add-summer-vacation-inspection.component';

describe('AddSummerVacationInspectionComponent', () => {
  let component: AddSummerVacationInspectionComponent;
  let fixture: ComponentFixture<AddSummerVacationInspectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSummerVacationInspectionComponent]
    });
    fixture = TestBed.createComponent(AddSummerVacationInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
