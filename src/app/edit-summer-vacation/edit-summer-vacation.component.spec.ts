import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSummerVacationComponent } from './edit-summer-vacation.component';

describe('EditSummerVacationComponent', () => {
  let component: EditSummerVacationComponent;
  let fixture: ComponentFixture<EditSummerVacationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSummerVacationComponent]
    });
    fixture = TestBed.createComponent(EditSummerVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
