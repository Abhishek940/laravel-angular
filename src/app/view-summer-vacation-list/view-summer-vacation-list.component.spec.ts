import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSummerVacationListComponent } from './view-summer-vacation-list.component';

describe('ViewSummerVacationListComponent', () => {
  let component: ViewSummerVacationListComponent;
  let fixture: ComponentFixture<ViewSummerVacationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSummerVacationListComponent]
    });
    fixture = TestBed.createComponent(ViewSummerVacationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
