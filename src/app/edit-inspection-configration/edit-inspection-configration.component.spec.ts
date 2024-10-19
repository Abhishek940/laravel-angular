import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInspectionConfigrationComponent } from './edit-inspection-configration.component';

describe('EditInspectionConfigrationComponent', () => {
  let component: EditInspectionConfigrationComponent;
  let fixture: ComponentFixture<EditInspectionConfigrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInspectionConfigrationComponent]
    });
    fixture = TestBed.createComponent(EditInspectionConfigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
