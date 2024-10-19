import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInspectionConfigrationComponent } from './view-inspection-configration.component';

describe('ViewInspectionConfigrationComponent', () => {
  let component: ViewInspectionConfigrationComponent;
  let fixture: ComponentFixture<ViewInspectionConfigrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInspectionConfigrationComponent]
    });
    fixture = TestBed.createComponent(ViewInspectionConfigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
